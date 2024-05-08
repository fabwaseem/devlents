"use server";

import { db } from "@/server/db";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import { getRandomLine } from "@/data/lines";

export const forgot = async (email: string) => {
  const existingEmail = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (!existingEmail) {
    return {
      type: "error",
      message: getRandomLine("emailNotFound"),
    };
  }

  if (existingEmail) {
    const account = await db.account.findFirst({
      where: {
        userId: existingEmail.id,
      },
    });
    if (account) {
      return {
        type: "error",
        message: `This email is linked to ${account.provider} account. Please login using ${account.provider}.`,
      };
    }
  }

  const token = await generateVerificationToken({
    userId: existingEmail.id,
    type: "PASSWORD_RESET",
  });

   await sendPasswordResetEmail({
    email,
    token,
  });

  return {
    type: "success",
    message: getRandomLine("passwordResetEmailSent"),
  };
};
