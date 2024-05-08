import { getVerificationToken } from "@/data/token";
import { db } from "@/server/db";
import { VerificationTokenType } from "@prisma/client";
import { v4 as uuid } from "uuid";

const expireDuration = 1000 * 60 * 60 * 0.05; // 5 minutes

/**
 * Generates a verification token for the given email.
 * If a verification token already exists for the email, it will be deleted before creating a new one.
 * @param email - The email for which to generate the verification token.
 * @returns The generated verification token.
 */
export const generateVerificationToken = async ({
  userId,
  type,
}: {
  userId: string;
  type: VerificationTokenType;
}) => {
  const exisitingToken = await getVerificationToken(userId, type);
  if (exisitingToken) {
    await db.verificationToken.delete({
      where: { id: exisitingToken.id },
    });
  }
  const expires = new Date(new Date().getTime() + expireDuration);

  const token = uuid();

  const verificationToken = await db.verificationToken.create({
    data: {
      token,
      type,
      user: {
        connect: {
          id: userId,
        },
      },
      expires,
    },
  });
  return verificationToken.token;
};
