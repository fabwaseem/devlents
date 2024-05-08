import * as z from "zod";

export const signupSchema = z
  .object({
    name: z.string().min(2, {
      message: "Name must be at least 2 characters long",
    }),
    username: z
      .string()
      .min(2, {
        message: "Username must be at least 2 characters long",
      })
      .max(20, {
        message: "Username must be at most 20 characters long",
      }),
    email: z.string().email({
      message: "Please enter a valid email address",
    }),
    password: z.string().min(8, {
      message: "At least 8 characters long",
    }),
    confirmPassword: z.string().optional(),
    accpetTerms: z.boolean(),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "Passwords must match!",
      path: ["confirmPassword"],
    },
  );
