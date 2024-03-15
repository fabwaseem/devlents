import React from "react";
import SocialLogin from "./SocialLogin";
import Link from "next/link";
import { Input } from "./ui/Input";
import { Checkbox } from "./ui/Checkbox";
import { Button } from "./ui/Button";

const LoginForm = () => {
  return (
    <div className="rounded-medium rounded-lg bg-white p-2.5 shadow-nav dark:bg-dark-200">
      <div className="rounded border border-dashed border-gray-100 bg-white p-12 dark:border-borderColour-dark dark:bg-dark-200 max-md:px-5 max-md:py-7">
        <SocialLogin />
        <div className="relative py-8 after:absolute after:top-1/2 after:h-[1px] after:w-full after:-translate-y-1/2 after:border after:border-dashed after:border-borderColour dark:after:border-borderColour-dark">
          <span className=" absolute left-1/2 top-1/2 z-10 inline-block w-10 -translate-x-1/2 -translate-y-1/2 bg-white text-center dark:bg-dark-200">
            Or
          </span>
        </div>
        <form>
          <div className="grid grid-cols-12 gap-y-6 ">
            <div className="col-span-12">
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Email address"
                label="Email Address"
              />
            </div>
            <div className="col-span-full">
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="At least 8 character"
                label="Password"
              />
            </div>
            <div className="col-span-full flex items-center justify-between">
              <Checkbox label="Remember me" />
              <Link href="forget-password" className="link-btn text-sm">
                Forget Password
              </Link>
            </div>
            <div className="col-span-full ">
              <Button className="w-full ">Login</Button>
            </div>
            <div className="col-span-full ">
              <p className="flex items-center justify-center gap-2 text-center font-jakarta_sans text-sm font-medium leading-[24px]">
                Not registered yet?
                <Link href="/signup" className="link-btn">
                  Create an Account
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
