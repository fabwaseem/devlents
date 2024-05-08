"use client";
import React, { useEffect, useRef, useState } from "react";
import SidebarLinkGroup from "./SidebarLinkGroup";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ArrowRightIcon, ChevronDown } from "lucide-react";
import { Button } from "../ui/Button";
import { sidebarLinks } from "@/lib/admin-config";
import Image from "next/image";

const Sidebar = () => {
  const pathname = usePathname();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-10 flex h-screen w-full max-w-[290px] flex-col bg-gray  duration-300 ease-linear dark:bg-dark lg:relative lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between gap-2 px-6 py-5 lg:py-6">
        <Link href="/admin">
          <Image
            src={"/images/logo.svg"}
            alt={"devlents"}
            width={40}
            height={30}
          />
        </Link>

        <Button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          size={"icon"}
          variant={"ghost"}
          className="absolute -right-10 top-3 lg:hidden"
        >
          <ArrowRightIcon
            className={`transition-transform ${sidebarOpen && " rotate-180"}`}
          />
        </Button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mt-5 px-4 py-4 lg:mt-9 lg:px-6">
          <div>
            <h3 className=" mb-4 ml-4 text-sm font-semibold">MENU</h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              {sidebarLinks.map((link, index) =>
                link.submenu ? (
                  <SidebarLinkGroup
                    key={index}
                    activeCondition={pathname.includes(`/admin${link.path}`)}
                  >
                    {(handleClick, open) => {
                      return (
                        <>
                          <button
                            className={`group relative   flex w-full items-center gap-2.5 rounded-lg px-4 py-2 font-medium duration-300 ease-in-out hover:bg-gray-100 dark:hover:bg-dark-200 ${
                              !open &&
                              pathname.includes(`/admin${link.path}`) &&
                              "bg-gray-100 dark:bg-dark-200"
                            }`}
                            onClick={(e) => handleClick()}
                          >
                            <link.icon size={16} />
                            {link.label}
                            <ChevronDown
                              size={16}
                              className={`absolute right-4 top-1/2 -translate-y-1/2 transition-transform ${
                                open && "rotate-180"
                              }`}
                            />
                          </button>
                          <div
                            className={` transform overflow-hidden ${
                              !open && "hidden"
                            }`}
                          >
                            <ul className="mb-5 mt-2 flex flex-col gap-2.5 pl-6">
                              {link.submenu?.map((sublink, index) => (
                                <li
                                  key={index}
                                >
                                  <Link
                                    href={`/admin${sublink.path}`}
                                    className={`group  relative flex items-center gap-2.5 rounded-lg px-4 py-2 font-medium duration-300 ease-in-out hover:bg-gray-100 dark:hover:bg-dark-200 ${
                                      pathname.includes(
                                        `/admin${sublink.path}`,
                                      ) && "bg-gray-100 dark:bg-dark-200"
                                    }`}
                                  >
                                    {sublink.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                          {/* <!-- Dropdown Menu End --> */}
                        </>
                      );
                    }}
                  </SidebarLinkGroup>
                ) : (
                    <li
                      key={index}
                    >
                    <Link
                      href={`/admin${link.path}`}
                      className={`group  relative flex items-center gap-2.5 rounded-lg px-4 py-2 font-medium duration-300 ease-in-out hover:bg-gray-100 dark:hover:bg-dark-200 ${
                        pathname === `/admin${link.path}` &&
                        "bg-gray-100 dark:bg-dark-200"
                      }`}
                    >
                      <link.icon size={16} />
                      {link.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
