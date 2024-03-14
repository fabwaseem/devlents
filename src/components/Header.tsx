"use client";
import { navLinks } from "@/lib/config";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "./ui/Button";
import { Icons } from "./Icons";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);

  

  return (
    <header className="fixed left-0 z-[1000000000] w-full bg-transparent  pt-8 transition-transform duration-500">
      <nav className="container flex  items-center ">
        <div className="nav-logo xl:min-w-[266px]">
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
        <ul className="nav-list dark:bg-dark-200 shadow-nav rounded-large mx-auto hidden bg-white p-2.5 lg:flex [&>*:not(:last-child)]:me-1">
          {navLinks.map((link, index) => (
            <li key={index} className="group relative">
              <Link
                href={link.url}
                className={`font-Inter text-paragraph rounded-large  dark:hover:bg-dark-200 flex items-center border  px-5 py-[5px] text-base font-medium leading-8 transition-colors duration-500 hover:bg-white hover:duration-500 lg:px-4 xl:px-5  dark:text-white
                ${
                  pathname === link.url
                    ? "border-borderColour dark:border-borderColour-dark "
                    : "hover:border-borderColour dark:hover:border-borderColour/10 border-transparent "
                }
                `}
              >
                {link.name}

                {link.submenu && (
                  <Icons.chevronDown className=" text-paragraph ml-1 mt-1 duration-500 group-hover:rotate-180 dark:text-white" />
                )}
              </Link>
              {link.submenu && (
                <ul className="dark:bg-dark-200 [&>*:not(:last-child)]:border-borderColour dark:[&>*:not(:last-child)]:border-borderColour-dark absolute  left-0   top-12 z-10 min-w-[250px] origin-top scale-y-0 rounded-md bg-white  p-5 opacity-0 duration-500 group-hover:scale-y-100 group-hover:opacity-100 [&>*:not(:first-child)]:mt-2.5 [&>*:not(:last-child)]:border-b [&>*:not(:last-child)]:border-dashed">
                  {link.submenu.map((sublink, index) => (
                    <li
                      key={index}
                      className="text-paragraph before:bg-paragraph relative overflow-hidden pb-2.5 text-base capitalize duration-500 before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-full before:origin-right before:scale-x-0  before:transition-transform before:duration-500 before:content-[''] before:hover:origin-left before:hover:scale-x-100 dark:before:bg-white"
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
            <Button size={"icon"} variant={"icon"}>
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
        <div
          className={`bg-primary dark:bg-dark shadow-nav fixed right-0 top-0 z-[111111] mx-auto flex h-screen w-full  items-center rounded-none p-2.5 px-10 backdrop-blur transition duration-500 ease-in-out max-lg:overflow-y-auto
        ${mobileMenuIsOpen ? "translate-x-0" : "translate-x-full"}
        `}
        >
          <Button
            size={"icon"}
            variant={"icon"}
            className=" absolute right-6 top-5"
            onClick={() => setMobileMenuIsOpen(!mobileMenuIsOpen)}
          >
            <Icons.X />
          </Button>
          <ul className="flex w-full max-w-[500px] flex-col gap-5">
            {navLinks.map((link, index) => (
              <li className="group relative">
                <Link
                  key={index}
                  href={link.url}
                  className={`font-Inter  rounded-large  dark:hover:bg-dark-200 flex items-center border px-5 py-[5px] text-base font-medium leading-8 text-white transition-colors duration-500 hover:duration-500 lg:px-4  xl:px-5
                  ${
                    pathname === link.url
                      ? "border-borderColour dark:border-borderColour-dark "
                      : "hover:border-borderColour dark:hover:border-borderColour/10 border-transparent "
                  }
                  `}
                >
                  {link.name}
                  <i className="fa-solid fa-angle-down text-paragraph ml-auto mt-1 duration-500 group-hover:rotate-180 dark:text-white" />
                </Link>
                {link.submenu && (
                  <ul className="dark:bg-dark-200 [&>*:not(:last-child)]:border-borderColour dark:[&>*:not(:last-child)]:border-borderColour-dark absolute left-0  top-12   z-10 w-full min-w-[250px] origin-top scale-y-0 rounded-md bg-white  p-5 opacity-0 duration-500 group-hover:scale-y-100 group-hover:opacity-100 [&>*:not(:first-child)]:mt-2.5 [&>*:not(:last-child)]:border-b [&>*:not(:last-child)]:border-dashed">
                    {link.submenu.map((sublink, index) => (
                      <li
                        key={index}
                        className="text-paragraph before:bg-paragraph relative overflow-hidden pb-2.5 text-base capitalize duration-500 before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-full before:origin-right before:scale-x-0  before:transition-transform before:duration-500 before:content-[''] before:hover:origin-left before:hover:scale-x-100 dark:before:bg-white"
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
  );
};

export default Header;
