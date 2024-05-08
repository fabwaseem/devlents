import { db } from "@/server/db";
import { VerificationTokenType } from "@prisma/client";

export const getVerificationToken = async (
  userId: string,
  type: VerificationTokenType,
) => {
  try {
    const verificationToken = await db.verificationToken.findFirst({
      where: {
        userId,
        type,
      },
    });
    return verificationToken;
  } catch (error) {
    return null;
  }
};

export const getVerificationTokenByToken = async (
  token: string,
  type: VerificationTokenType,
) => {
  try {
    const verificationToken = await db.verificationToken.findFirst({
      where: {
        token,
        type,
      },
    });
    return verificationToken;
  } catch (error) {
    return null;
  }
};

export const deleteVerificationToken = async (id: string) => {
  try {
    await db.verificationToken.delete({
      where: {
        id,
      },
    });
    return true;
  } catch (error) {
    return false;
  }
};
