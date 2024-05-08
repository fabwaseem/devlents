import NewPasswordForm from "@/components/NewPasswordForm";
import { getRandomLine } from "@/data/lines";
import {
  deleteVerificationToken,
  getVerificationTokenByToken,
} from "@/data/token";
import { db } from "@/server/db";
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
    "PASSWORD_RESET",
  );

  if (!existingToken) {
    redirect(DEFAULT_LOGIN_REDIRECT);
  }

  if (new Date(existingToken.expires) < new Date()) {
    redirect(DEFAULT_LOGIN_REDIRECT);
  }

  const user = await db.user.findUnique({
    where: {
      id: existingToken.userId,
    },
  });

  if (!user) {
    redirect(DEFAULT_LOGIN_REDIRECT);
  }

  await deleteVerificationToken(existingToken.id);

  return (
    <section className="relative mb-[150px] pt-[120px] max-md:mb-[100px]  ">
      <div className=" container relative">
        <div className="mx-auto mb-12 max-w-[475px] text-center">
          <h2>{getRandomLine("reset")}</h2>
        </div>
        <div className="relative z-10 mx-auto max-w-[510px] ">
          <div className="absolute left-1/2 top-1/2 -z-10 flex -translate-x-1/2 -translate-y-1/2 max-md:hidden max-md:flex-col">
            <div className="rounded-full bg-primary-200/30  blur-[145px] max-xl:h-[335px]  max-xl:w-[335px] xl:h-[442px] xl:w-[442px]" />
            <div className="-ml-[170px] rounded-full  bg-primary-200/50 blur-[145px]  max-xl:h-[335px] max-xl:w-[335px] max-md:ml-0 xl:h-[442px] xl:w-[442px]" />
            <div className="-ml-[170px] rounded-full  bg-primary-200/30 blur-[145px]  max-xl:h-[335px] max-xl:w-[335px] max-md:ml-0 xl:h-[442px] xl:w-[442px]" />
          </div>
          <NewPasswordForm user={user} />
        </div>
      </div>
    </section>
  );
};

export default page;
