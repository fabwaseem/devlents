"use client";
import { navLinks } from "@/lib/config";
import Image from "next/image";
import Link from "next/link";
import React, { use, useEffect, useRef, useState } from "react";
import { Button } from "./ui/Button";
import { Icons } from "./Icons";
import { usePathname } from "next/navigation";
import { Input } from "./ui/Input";

const Header = () => {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const navRef = useRef<HTMLHeadElement>(null);
  const annoucementRef = useRef<HTMLDivElement>(null);
  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState<Boolean>(false);
  const [searchModalIsOpen, setSearchModalIsOpen] = useState<Boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80 && navRef.current !== null) {
        navRef.current.classList.add("nav-sticky");
        annoucementRef.current?.classList.add("scale-y-0");
      } else if (navRef.current !== null) {
        navRef.current.classList.remove("nav-sticky");
        annoucementRef.current?.classList.remove("scale-y-0");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {!isHome && (
        <div
          className="fixed left-0 top-0 z-[1000000000] w-full origin-top bg-primary py-2 text-center transition-all duration-500"
          ref={annoucementRef}
        >
          <p className="font-medium text-white max-lg:text-sm">
            We are currently in the process of updating our website.
          </p>
        </div>
      )}

      <header
        className={`fixed left-0 z-[1000000000] w-full bg-transparent transition-all duration-500
        ${isHome ? "pt-8" : "top-12"}`}
        ref={navRef}
      >
        <nav className="container flex  items-center ">
          <div className={`nav-logo ${isHome ? "xl:min-w-[266px]" : ""} `}>
            <Link href="/">
              <Image
                src="images/logo.svg"
                alt="logo"
                className="dark:hidden"
                width={50}
                height={50}
              />
              <Image
                src="images/logo.svg"
                alt="logo"
                className="hidden dark:inline-block"
                width={50}
                height={50}
              />
            </Link>
          </div>
          <ul
            className={`hidden  lg:flex [&>*:not(:last-child)]:me-1
          ${isHome ? " mx-auto rounded-large bg-white p-2.5 shadow-nav dark:bg-dark-200" : "xl:ml-15 flex-1 lg:ml-7"}
          `}
          >
            {navLinks.map((link, index) => (
              <li key={index} className="group relative">
                <Link
                  href={link.url}
                  className={`flex items-center rounded-large  border px-5 py-[5px] font-Inter  text-base font-medium leading-8 text-paragraph transition-colors duration-500 hover:bg-white hover:duration-500 dark:text-white dark:hover:bg-dark-200 lg:px-4  xl:px-5
                ${
                  pathname === link.url
                    ? "border-borderColour dark:border-borderColour-dark "
                    : "border-transparent hover:border-borderColour dark:hover:border-borderColour/10 "
                }
                `}
                >
                  {link.name}

                  {link.submenu && (
                    <Icons.chevronDown className=" ml-1 mt-1 text-paragraph duration-500 group-hover:rotate-180 dark:text-white" />
                  )}
                </Link>
                {link.submenu && (
                  <ul className="absolute left-0 top-12 z-10  min-w-[250px]   origin-top scale-y-0 rounded-md bg-white p-5 opacity-0 duration-500  group-hover:scale-y-100 group-hover:opacity-100 dark:bg-dark-200 [&>*:not(:first-child)]:mt-2.5 [&>*:not(:last-child)]:border-b [&>*:not(:last-child)]:border-dashed [&>*:not(:last-child)]:border-borderColour dark:[&>*:not(:last-child)]:border-borderColour-dark">
                    {link.submenu.map((sublink, index) => (
                      <li
                        key={index}
                        className="relative overflow-hidden pb-2.5 text-base capitalize text-paragraph duration-500 before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-full before:origin-right before:scale-x-0 before:bg-paragraph  before:transition-transform before:duration-500 before:content-[''] before:hover:origin-left before:hover:scale-x-100 dark:before:bg-white"
                      >
                        <Link href={sublink.url} className="flex">
                          {sublink.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <ul className="flex items-center max-lg:ml-auto  [&>*:not(:last-child)]:me-2.5">
            <li className="">
              <Button
                size={"icon"}
                variant={"icon"}
                onClick={() => setSearchModalIsOpen(!searchModalIsOpen)}
              >
                <Icons.search />
              </Button>
            </li>
            <li className="max-lg:hidden">
              <Button asChild size={"sm"}>
                <Link href="/signup">Sign up</Link>
              </Button>
            </li>
            <li className="max-lg:inline-block lg:hidden ">
              <Button
                size={"icon"}
                variant={"icon"}
                onClick={() => setMobileMenuIsOpen(!mobileMenuIsOpen)}
              >
                <Icons.menu />
              </Button>
            </li>
          </ul>

          {/* MOBILE MENU */}
          <div
            className={`fixed right-0 top-0 z-[111111] mx-auto flex h-screen w-full items-center rounded-none bg-primary  p-2.5 px-10 shadow-nav backdrop-blur transition duration-500 ease-in-out dark:bg-dark max-lg:overflow-y-auto
        ${mobileMenuIsOpen ? "translate-x-0" : "translate-x-full"}
        `}
          >
            <Button
              size={"icon"}
              variant={"icon"}
              className="absolute right-6 top-4"
              onClick={() => setMobileMenuIsOpen(!mobileMenuIsOpen)}
            >
              <Icons.X />
            </Button>
            <ul className="flex w-full max-w-[500px] flex-col gap-5">
              {navLinks.map((link, index) => (
                <li key={index} className="group relative">
                  <Link
                    href={link.url}
                    className={`flex  items-center  rounded-large border px-5 py-[5px] font-Inter text-base font-medium leading-8 text-white transition-colors duration-500 hover:duration-500 dark:hover:bg-dark-200 lg:px-4  xl:px-5
                  ${
                    pathname === link.url
                      ? "border-borderColour dark:border-borderColour-dark "
                      : "border-transparent hover:border-borderColour dark:hover:border-borderColour/10 "
                  }
                  `}
                  >
                    {link.name}
                    <i className="fa-solid fa-angle-down ml-auto mt-1 text-paragraph duration-500 group-hover:rotate-180 dark:text-white" />
                  </Link>
                  {link.submenu && (
                    <ul className="absolute left-0 top-12 z-10 w-full  min-w-[250px]   origin-top scale-y-0 rounded-md bg-white p-5 opacity-0 duration-500  group-hover:scale-y-100 group-hover:opacity-100 dark:bg-dark-200 [&>*:not(:first-child)]:mt-2.5 [&>*:not(:last-child)]:border-b [&>*:not(:last-child)]:border-dashed [&>*:not(:last-child)]:border-borderColour dark:[&>*:not(:last-child)]:border-borderColour-dark">
                      {link.submenu.map((sublink, index) => (
                        <li
                          key={index}
                          className="relative overflow-hidden pb-2.5 text-base capitalize text-paragraph duration-500 before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-full before:origin-right before:scale-x-0 before:bg-paragraph  before:transition-transform before:duration-500 before:content-[''] before:hover:origin-left before:hover:scale-x-100 dark:before:bg-white"
                        >
                          <Link href={sublink.url} className="flex">
                            {sublink.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}

              <li className="ml-5">
                <Button asChild size={"sm"}>
                  <Link href="/signup">Sign up</Link>
                </Button>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      {/*SEARCH MODAL */}
      <div
        aria-hidden="false"
        className={`fixed inset-0 top-0 z-[99999999990] items-start  justify-center
        ${searchModalIsOpen ? "flex" : "hidden"}
        `}
        id="modal"
        role="dialog"
      >
        <div
          className=" absolute left-0 top-0 h-full w-full bg-dark-200/25"
          onClick={() => setSearchModalIsOpen(false)}
        ></div>
        <div className="animate-keep-bounce relative h-auto w-full max-w-xl p-4">
          <div className="relative rounded-lg bg-white p-2.5 shadow-box dark:bg-dark-200 ">
            <div className=" rounded border border-dashed border-gray-100 p-10 dark:border-borderColour-dark max-lg:p-5 ">
              <div className="bg flex items-center justify-between border-b border-dashed border-b-borderColour pb-5 dark:border-borderColour-dark">
                <h3 className="text-paragraph dark:text-white">Search</h3>
                <Button
                  size={"icon"}
                  variant={"icon"}
                  onClick={() => setSearchModalIsOpen(false)}
                >
                  <Icons.X />
                </Button>
              </div>
              <form className="mt-5">
                <div>
                  <div className="flex">
                    <div className="relative w-full">
                      <Input
                        className=" rounded-md"
                        placeholder="Search Components"
                        type="text"
                        defaultValue=""
                      />
                    </div>
                  </div>
                </div>
              </form>
              <p className="mb-12 hidden pt-5 font-medium">
                <span>No recent searches</span>
              </p>
              <div className="pt-5">
                <h3 className="mb-1">Search Results</h3>
                <ul className="[&>*:not(:last-child)]:border-b [&>*:not(:last-child)]:border-dashed  [&>*:not(:last-child)]:border-gray-100  dark:[&>*:not(:last-child)]:border-borderColour-dark">
                  <li className="group ">
                    <Link
                      className="flex items-center justify-between py-5 font-medium"
                      href="/"
                    >
                      Tailwind Login Page
                      <Icons.chevronRight />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
