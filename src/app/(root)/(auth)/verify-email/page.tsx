import { Button } from "@/components/ui/Button";
import {
  deleteVerificationToken,
  getVerificationTokenByToken,
} from "@/data/token";
import { db } from "@/server/db";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { DEFAULT_LOGIN_REDIRECT } from "routes";
const page = async ({ searchParams }: { searchParams: { token: string } }) => {
  const token = searchParams.token;
  if (!token) {
    redirect(DEFAULT_LOGIN_REDIRECT);
  }

  const existingToken = await getVerificationTokenByToken(
    token,
    "EMAIL_VERIFICATION",
  );

  if (!existingToken) {
    redirect(DEFAULT_LOGIN_REDIRECT);
  }

  if (new Date(existingToken.expires) < new Date()) {
    redirect(DEFAULT_LOGIN_REDIRECT);
  }

   await db.user.update({
    where: {
      id: existingToken.userId,
    },
    data: {
      emailVerified: new Date(),
    },
  });

  await deleteVerificationToken(existingToken.id);

  return (
    <section className="relative mb-[150px] pt-[120px] max-md:mb-[100px]  ">
      <div className=" container relative">
        <div className="relative z-10 mx-auto  ">
          <div className="absolute left-1/2 top-1/2 -z-10 flex -translate-x-1/2 -translate-y-1/2 max-md:hidden max-md:flex-col">
            <div className="rounded-full bg-primary-200/30  blur-[145px] max-xl:h-[335px]  max-xl:w-[335px] xl:h-[442px] xl:w-[442px]" />
            <div className="-ml-[170px] rounded-full  bg-primary-200/50 blur-[145px]  max-xl:h-[335px] max-xl:w-[335px] max-md:ml-0 xl:h-[442px] xl:w-[442px]" />
            <div className="-ml-[170px] rounded-full  bg-primary-200/30 blur-[145px]  max-xl:h-[335px] max-xl:w-[335px] max-md:ml-0 xl:h-[442px] xl:w-[442px]" />
          </div>

          <div className="mb-150 pt-[150px]">
            <div className=" container relative">
              <div className="mx-auto max-w-[700px] text-center">
                <h1 className=" bg-gradient-to-b from-primary to-90% bg-clip-text text-[140px] font-bold leading-[1] text-transparent dark:text-transparent">
                  Success
                </h1>
                <p className="section-tagline -mt-16">Verification</p>
                <h2 className="mb-9 text-[64px] font-bold leading-[1.22] ">
                  Woohoo! <br />
                  Ready to Go!
                </h2>
                <p className="mb-8 text-xl">
                  Thank you for verifying your email. <br /> You can now login
                  to your account.
                </p>
                <Button asChild className="mx-auto max-w-lg">
                  <Link href="/login">Login</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
