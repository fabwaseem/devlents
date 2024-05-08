import React from "react";
import SocialLogin from "./SocialLogin";

const AuthPageWrapper = ({
  children,
  isPending,
}: {
  children: React.ReactNode;
  isPending: boolean;
}) => {
  return (
    <div className=" rounded-lg bg-white p-2.5 shadow-nav dark:bg-dark-200">
      <div className="rounded border border-dashed border-gray-100 bg-white p-12 dark:border-borderColour-dark dark:bg-dark-200 max-md:px-5 max-md:py-7">
        <SocialLogin isLoading={isPending} />
        <div className="relative py-8 after:absolute after:top-1/2 after:h-[1px] after:w-full after:-translate-y-1/2 after:border after:border-dashed after:border-borderColour dark:after:border-borderColour-dark">
          <span className=" absolute left-1/2 top-1/2 z-10 inline-block w-10 -translate-x-1/2 -translate-y-1/2 bg-white text-center dark:bg-dark-200">
            Or
          </span>
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthPageWrapper;
