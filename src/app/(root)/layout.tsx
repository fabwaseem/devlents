import Feedback from "@/components/Feedback";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import TopLoader from "@/components/TopLoader";
import { ThemeToggle } from "@/components/theme-toggle";
import ToastProvider from "@/components/toast-provider";
import { getServerAuthSession } from "@/server/auth";
import React from "react";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerAuthSession();

  return (
    <>
      <TopLoader />
      <ThemeToggle />
      <Header session={session} />
      <main className="min-h-screen">{children}</main>
      <Feedback />
      <Footer />
      <ToastProvider />
    </>
  );
};

export default layout;
