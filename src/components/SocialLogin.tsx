import React from "react";
import { Logos } from "./Logos";
import { Button } from "./ui/Button";

const SocialLogin = () => {
  return (
    <div>
      <Button variant={"outline"} className=" w-full">
        <Logos.google />
        Continue with Google
      </Button>
      <Button variant={"outline"} className=" mt-2 w-full">
        <Logos.facebookLogo />
        Continue with Facebook
      </Button>
    </div>
  );
};

export default SocialLogin;
