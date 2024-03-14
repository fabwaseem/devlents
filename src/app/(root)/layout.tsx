import Header from "@/components/Header";
import { ThemeToggle } from "@/components/theme-toggle";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ThemeToggle />
      <Header />
      {children}
    </>
  );
};

export default layout;
