"use client";
import React, { useEffect, useState } from "react";
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
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { useSearchParams } from "next/navigation";
import AuthPageWrapper from "./AuthPageWrapper";
import { env } from "@/env";

const LoginForm = ({ error }: { error?: string }) => {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const formSchema = z.object({
    email: z.string().email({
      message: "Please enter a valid email address",
    }),
    password: z.string().min(8, {
      message: "At least 8 characters long",
    }),
  });

  useEffect(() => {
    if (error === "OAuthAccountNotLinked") {
      toast.error("This email is already linked with another account");
    }
  }, [error]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    const response = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
    });

    if (response?.status !== 200) {
      toast.error(response?.error ?? "");
    } else {
      toast.success("Login successfully");
      const from = searchParams.get("from") ?? "/";
      const url = new URL(from, env.BASE_URL);
      window.location.href = url.href;
    }
    setIsLoading(false);
  }
  return (
    <AuthPageWrapper isPending={isLoading}>
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

            <div className=" flex items-center justify-end gap-2">
              <Link href="/forgot-password" className="link-btn text-sm ">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" className="w-full ">
              {isLoading && (
                <Icons.spinner className="h-6 w-6 animate-spin stroke-white transition-colors duration-500" />
              )}{" "}
              Login
            </Button>

            <p className="flex items-center justify-center gap-2 text-center font-jakarta_sans text-sm font-medium leading-[24px]">
              Don&apos;t have an account?
              <Link href="/signup" className="link-btn">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </Form>
    </AuthPageWrapper>
  );
};

export default LoginForm;
