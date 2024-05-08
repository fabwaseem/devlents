"use client";
import React, { startTransition, useState, useTransition } from "react";
import SocialLogin from "./SocialLogin";
import Link from "next/link";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Icons } from "./Icons";
import { toast } from "react-toastify";
import { forgot } from "@/actions/user/forgot";
import { User } from "@prisma/client";
import { newPassword } from "@/actions/user/newPassword";
import { useRouter } from "next/navigation";

const NewPasswordForm = ({ user }: { user: User }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const formSchema = z
    .object({
      password: z.string().min(8, {
        message: "At least 8 characters long",
      }),
      confirmPassword: z.string().optional(),
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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(() => {
      newPassword({
        email: user.email,
        password: values.password,
      }).then((data) => {
        data.type === "success"
          ? toast.success(data.message)
          : toast.error(data.message);
        data.type === "success" && router.push("/login");
      }).catch((error) => {
        toast.error(error.message);
      });
    });
  }
  return (
    <div className=" rounded-lg bg-white p-2.5 shadow-nav dark:bg-dark-200">
      <div className="rounded border border-dashed border-gray-100 bg-white p-12 dark:border-borderColour-dark dark:bg-dark-200 max-md:px-5 max-md:py-7">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-6 ">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="password"
                        id="password"
                        placeholder="At least 8 character"
                        label="Password"
                        autoComplete="new-password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="password"
                        id="confirmPassword"
                        placeholder="Confirm Password"
                        label="Confirm Password"
                        autoComplete="new-password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full ">
                {isPending && (
                  <Icons.spinner className="h-6 w-6 animate-spin stroke-white transition-colors duration-500" />
                )}{" "}
                Submit
              </Button>

              <p className="flex items-center justify-center gap-2 text-center font-jakarta_sans text-sm font-medium leading-[24px]">
                Did you try turning it off and on again?
                <Link href="/login" className="link-btn">
                  Login now.
                </Link>
              </p>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default NewPasswordForm;
