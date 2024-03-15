"use client";
import React, { useState } from "react";
import SocialLogin from "./SocialLogin";
import Link from "next/link";
import { Input } from "./ui/Input";
import { Checkbox } from "./ui/Checkbox";
import { Button } from "./ui/Button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "./ui/toast";
import { Icons } from "./Icons";

const SignupForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const formSchema = z
    .object({
      name: z.string().min(2, {
        message: "Name must be at least 2 characters long",
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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      accpetTerms: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.accpetTerms === false) {
      return toast({
        title: "Please accept the terms and conditions",
        icon: "error",
      });
    }
    setIsLoading(true);
    // register user send post request to /api/auth/register
    const data = {
      name: values.name,
      email: values.email,
      password: values.password,
    };

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const resData = await response.json();

    if (response.status === 201) {
      toast({
        title: resData.msg,
      });
      form.reset();
    } else {
      toast({
        title: resData.msg,
        icon: "error",
      });
    }
    setIsLoading(false);
  }

  return (
    <div className="rounded-medium rounded-lg bg-white p-2.5 shadow-nav dark:bg-dark-200">
      <div className="rounded border border-dashed border-gray-100 bg-white p-12 dark:border-borderColour-dark dark:bg-dark-200 max-md:px-5 max-md:py-7">
        <SocialLogin isLoading={isLoading} />
        <div className="relative py-8 after:absolute after:top-1/2 after:h-[1px] after:w-full after:-translate-y-1/2 after:border after:border-dashed after:border-borderColour dark:after:border-borderColour-dark">
          <span className=" absolute left-1/2 top-1/2 z-10 inline-block w-10 -translate-x-1/2 -translate-y-1/2 bg-white text-center dark:bg-dark-200">
            Or
          </span>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-6 ">
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="email"
                        id="email"
                        placeholder="Email address"
                        label="Email Address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col gap-6 md:gap-2 md:flex-row">
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
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className=" flex items-center gap-2">
                <Checkbox
                  label="By signing up you agree to the"
                  {...form.register("accpetTerms")}
                />
                <Link href="terms-conditions" className="link-btn text-sm ">
                  Terms & Conditions
                </Link>
              </div>

              <Button type="submit" className="w-full ">
                {isLoading && (
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
      </div>
    </div>
  );
};

export default SignupForm;
