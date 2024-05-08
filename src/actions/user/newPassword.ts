"use server";

import bcrypt from "bcryptjs";
import { db } from "@/server/db";
import { sendPasswordUpdatedEmail } from "@/lib/mail";
import { getRandomLine } from "@/data/lines";

export const newPassword = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const existingUser = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (!existingUser) {
    return {
      type: "error",
      message: getRandomLine("emailNotFound"),
    };
  }

  if (existingUser) {
    const account = await db.account.findFirst({
      where: {
        userId: existingUser.id,
      },
    });
    if (account) {
      return {
        type: "error",
        message: `This email is linked to ${account.provider} account. Please login using ${account.provider}.`,
      };
    }
  }

  const hashedPassword = await bcrypt.hash(password, 10);

   await db.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      password: hashedPassword,
    },
  });

   await sendPasswordUpdatedEmail({
    email,
  });

  return {
    type: "success",
    message: getRandomLine("passwordUpdated"),
  };
};
