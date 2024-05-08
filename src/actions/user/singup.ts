"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { signupSchema } from "@/schemas/user/signup";
import { db } from "@/server/db";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";
import { getRandomLine } from "@/data/lines";

export const signup = async (values: z.infer<typeof signupSchema>) => {
  const validatedFields = signupSchema.safeParse(values);
  if (!validatedFields.success) {
    return { type: "error", message: validatedFields.error.message };
  }
  const { email, password, name, username } = validatedFields.data;

  const existingEmail = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (existingEmail) {
    const account = await db.account.findFirst({
      where: {
        userId: existingEmail.id,
      },
    });

    if (account) {
      return {
        type: "error",
        message: `Email already linked to ${account.provider} account. Please login using ${account.provider}.`,
      };
    } else {
      return {
        type: "error",
        message: getRandomLine("emailAlreadyRegistered"),
      };
    }
  }

  const existingUsername = await db.user.findUnique({
    where: {
      username,
    },
  });

  if (existingUsername) {
    return { type: "error", message: getRandomLine("usernameAlreadyUsed") };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await db.user.create({
    data: {
      name,
      email,
      username,
      password: hashedPassword,
    },
  });

  const token = await generateVerificationToken({
    userId: user.id,
    type: "EMAIL_VERIFICATION",
  });

   await sendVerificationEmail({
    email,
    token,
  });

  return {
    type: "success",
    message: getRandomLine("registrationSuccessful"),
  };
};
