import Feedback from "@/components/Feedback";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Parallax } from "@/components/aos";
import { ThemeToggle } from "@/components/theme-toggle";
import { getServerAuthSession } from "@/server/auth";
import React from "react";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerAuthSession();

  return (
    <>
      <Parallax />
      <ThemeToggle />
      <Header session={session} />
      <main className="min-h-screen">{children}</main>
      {session && <Feedback />}
      <Footer />
    </>
  );
};

export default layout;
