import { type User } from "next-auth";

type UserId = string;

declare module "next-auth/jwt" {
  interface JWT {
    id: UserId;
    username: string;
    website?: string;
    location?: string;
    company?: string;
    bio?: string;
  }
}

declare module "next-auth" {
  interface Session {
    user: User & {
      id: UserId;
      username: string;
      website?: string;
      location?: string;
      company?: string;
      bio?: string;
    };
  }
}
