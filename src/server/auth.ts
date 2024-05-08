import { PrismaAdapter } from "@auth/prisma-adapter";
import { getServerSession, type NextAuthOptions } from "next-auth";
import { type Adapter } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { faker } from "@faker-js/faker";

import { env } from "@/env";
import { db } from "@/server/db";
import { Role } from "@prisma/client";

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db) as Adapter,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // check to see if email and password is there
        if (!credentials) return null;
        if (
          !credentials.password ||
          (!credentials.email && !credentials.username)
        ) {
          throw new Error("All fields are required");
        }

        // check to see if user exists
        const user = await db.user.findMany({
          where: {
            OR: [
              {
                email: credentials.email,
              },
              {
                username: credentials.username,
              },
            ],
          },
        });

        // if no user was found
        if (!user[0]) {
          throw new Error("Email or password is incorrect");
        }

        if (!user[0].password) {
          throw new Error(
            "Email is linked to third-party account, setup a password from aacount setting to login with email and password",
          );
        }

        // check to see if password matches
        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user[0].password,
        );

        // if password does not match
        if (!passwordMatch) {
          throw new Error("Email or password is incorrect");
        }

        return {
          id: user[0].id,
          username: user[0].username,
          email: user[0].email,
          name: user[0].name,
          image: user[0].image,
        };
      },
    }),
    GithubProvider({
      clientId: env.GITHUB_CLIENT_ID ,
      clientSecret: env.GITHUB_CLIENT_SECRET ,
    }),
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID ,
      clientSecret: env.GOOGLE_CLIENT_SECRET ,
    }),
  ],
  events: {
    async linkAccount({ user }) {
      const username = user.name
        ? faker.internet
            .userName({
              firstName: user.name.split(" ")[0],
              lastName: user.name.split(" ")[1],
            })
            .toLowerCase()
        : "";

      await db.user.update({
        where: { id: user.id },
        data: {
          username,
          emailVerified: new Date(),
        },
      });
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: env.NODE_ENV === "development",
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.username = token.username;
        session.user.email = token.email;
        session.user.role = token.role as Role;
        session.user.image = token.picture;
      }

      return session;
    },
    async jwt({ token, user }) {
      const dbUser = await db.user.findFirst({
        where: {
          email: token.email ?? "",
        },
      });

      if (!dbUser) {
        if (user) {
          token.id = user?.id;
        }
        return token;
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        username: dbUser.username ?? "",
        email: dbUser.email,
        role: dbUser.role,
        picture: dbUser.image,
      };
    },
  },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);

export const getServerUser = async () => {
  const session = await getServerAuthSession();
  return session?.user;
};
