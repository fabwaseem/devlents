import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ThemeToggle } from "@/components/theme-toggle";
import { getServerAuthSession } from "@/server/auth";
import React from "react";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerAuthSession();
  return (
    <>
      <ThemeToggle />
      <Header session={session} />
      {children}
      <Footer />
    </>
  );
};

export default layout;
