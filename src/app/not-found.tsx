import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import React from "react";
const Page = async () => {
  return (
    <>
      <ThemeToggle />
      <main>
        <section className="mb-150 pt-[150px]">
          <div
            className=" container relative"
          >
            <div className="mx-auto max-w-[700px] text-center">
              <h1 className="from-0to-primary/0 bg-gradient-to-b from-primary to-90% bg-clip-text text-[140px] font-bold leading-[1] text-transparent dark:text-transparent">
                404
              </h1>
              <p className="section-tagline -mt-16">Error</p>
              <h2 className="mb-9 text-[64px] font-bold leading-[1.22] ">
                Ooops! <br />
                Page Not Found
              </h2>
              <p className="mb-8 text-xl">
                This page doesn&apos;t exist or was removed! <br />
                We suggest you go back to home.
              </p>
              <Button asChild>
                <Link href="/">Go Back-Home</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      {/* <Footer /> */}
    </>
  );
};

export default Page;
