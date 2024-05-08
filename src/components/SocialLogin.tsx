"use client";
import React, { useState } from "react";
import { Logos } from "./Logos";
import { Button } from "./ui/Button";
import { signIn } from "next-auth/react";
import { Icons } from "./Icons";

const SocialLogin = ({ isLoading }: { isLoading?: boolean }) => {
  const [isGitHubLoading, setIsGitHubLoading] = useState<boolean>(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);

  const disabled = isGoogleLoading || isGitHubLoading || isLoading;
  return (
    <div className="flex gap-2">
      <Button
        variant={"outline"}
        className=" group w-full"
        onClick={async () => {
          setIsGoogleLoading(true);
          await signIn("google");
        }}
        disabled={disabled}
      >
        {isGoogleLoading ? (
          <Icons.spinner className="h-6 w-6 animate-spin transition-colors duration-500 group-hover:stroke-white" />
        ) : (
          <Logos.google />
        )}{" "}

      </Button>
      <Button
        variant={"outline"}
        className="group  w-full"
        onClick={async () => {
          setIsGitHubLoading(true);
          await signIn("github");
        }}
        disabled={disabled}
      >
        {isGitHubLoading ? (
          <Icons.spinner className="h-6 w-6 animate-spin transition-colors duration-500 group-hover:stroke-white" />
        ) : (
          <Logos.gitHub className="transition-colors duration-500 group-hover:fill-white" />
        )}{" "}
      </Button>
    </div>
  );
};

export default SocialLogin;
