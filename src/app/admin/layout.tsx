import Header from "@/components/admin/Header";
import Sidebar from "@/components/admin/Sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import React from "react";



const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      <ThemeToggle />
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Header  />
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default layout;
