"use client";
import React, { useState, useTransition } from "react";
import SocialLogin from "./SocialLogin";
import Link from "next/link";
import { Input } from "./ui/Input";
import { Checkbox } from "./ui/Checkbox";
import { Button } from "./ui/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Icons } from "./Icons";
import { toast } from "react-toastify";
import { signupSchema } from "@/schemas/user/signup";
import { signup } from "@/actions/user/singup";
import AuthPageWrapper from "./AuthPageWrapper";

const SignupForm = () => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      accpetTerms: false,
    },
  });

  async function onSubmit(values: z.infer<typeof signupSchema>) {
    if (values.accpetTerms === false) {
      return toast.error("Please accept the terms and conditions");
    }
    startTransition(() => {
      signup(values)
        .then((data) => {
          data.type === "success"
            ? toast.success(data.message)
            : toast.error(data.message);
        })
        .catch((error) => {
          toast.error(error.message);
        });
    });
  }

  return (
    <AuthPageWrapper isPending={isPending}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-6 ">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="email"
                      id="email"
                      placeholder="Email address"
                      label="Email Address"
                      autoComplete="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col gap-6 md:flex-row md:gap-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="text"
                        id="name"
                        placeholder="Enter your name"
                        label="Your Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="text"
                        id="username"
                        placeholder="Enter your username"
                        autoComplete="username"
                        label="Username"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gap-6 md:flex-row md:gap-2">
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
            </div>

            <div className=" flex items-center justify-between gap-2">
              <FormField
                control={form.control}
                name="accpetTerms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        id="accpetTerms"
                      />
                    </FormControl>
                    <label
                      className=" text-sm leading-none"
                      htmlFor="accpetTerms"
                    >
                      I agree with the{" "}
                      <Link
                        href="terms-conditions"
                        className="link-btn !leading-none"
                      >
                        Terms & Conditions
                      </Link>
                    </label>
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="w-full ">
              {isPending && (
                <Icons.spinner className="h-6 w-6 animate-spin stroke-white transition-colors duration-500" />
              )}{" "}
              Sign up
            </Button>

            <p className="flex items-center justify-center gap-2 text-center font-jakarta_sans text-sm font-medium leading-[24px]">
              Already have an account?
              <Link href="/login" className="link-btn">
                Login
              </Link>
            </p>
          </div>
        </form>
      </Form>
    </AuthPageWrapper>
  );
};

export default SignupForm;
