"use client";
import { navLinks } from "@/lib/config";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "./ui/Button";
import { Icons } from "./Icons";
import { usePathname } from "next/navigation";
import { Input } from "./ui/Input";
import { type Session } from "next-auth";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar";
import { getInitials } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import link from "next/link";

const Header = ({ session }: { session: Session | null }) => {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const navRef = useRef<HTMLHeadElement>(null);
  const annoucementRef = useRef<HTMLDivElement>(null);
  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState<boolean>(false);
  const [searchModalIsOpen, setSearchModalIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40 && navRef.current !== null) {
        navRef.current.classList.add("nav-sticky");
        annoucementRef.current?.classList.add("scale-y-0");
      } else if (navRef.current !== null && !mobileMenuIsOpen) {
        navRef.current.classList.remove("nav-sticky");
        annoucementRef.current?.classList.remove("scale-y-0");
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [mobileMenuIsOpen]);

  useEffect(() => {
    setMobileMenuIsOpen(false);
    setSearchModalIsOpen(false);
  }, [pathname]);

  const showNotification = false;

  return (
    <>
      {!isHome && showNotification ? (
        <div
          className="fixed left-0 top-0 z-20 w-full origin-top bg-primary py-2 text-center transition-all duration-500"
          ref={annoucementRef}
        >
          <p className="font-medium text-white max-lg:text-sm">
            We are currently in the process of updating our website.
          </p>
        </div>
      ) : null}

      <header
        className={`fixed  left-0 z-20 w-full bg-transparent transition-all duration-500
        ${isHome || !showNotification ? "pt-8" : "top-12"}`}
        ref={navRef}
      >
        <nav className="container flex  items-center ">
          <div className={` ${isHome ? "xl:min-w-[266px]" : ""} `}>
            <Link href="/" className=" relative h-8 w-8 md:h-12 md:w-12">
              <Image
                src="/images/logo.svg"
                alt="logo"
                className="dark:hidden"
                fill
              />
              <Image
                src="/images/logo.svg"
                alt="logo"
                className="hidden dark:inline-block"
                fill
              />
            </Link>
          </div>
          <ul
            className={`hidden  lg:flex [&>*:not(:last-child)]:me-1
          ${isHome ? " mx-auto rounded-large bg-white p-2.5 shadow-nav dark:bg-dark-200" : "xl:ml-15 flex-1 lg:ml-7"}
          `}
          >
            {navLinks.map((link, index) =>
              link.name === "Components" && link.submenu ? (
                <li key={index}>
                  <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild className="group">
                      <span
                        className={`flex cursor-pointer items-center  rounded-large border px-5 py-[5px]  font-sans text-base font-medium leading-8 text-paragraph transition-colors duration-500 hover:bg-white hover:duration-500 dark:text-white dark:hover:bg-dark-200  lg:px-4 xl:px-5
                ${
                  pathname === link.url
                    ? "border-borderColour dark:border-borderColour-dark "
                    : "border-transparent hover:border-borderColour dark:hover:border-borderColour/10 "
                }
                `}
                      >
                        {link.name}
                        <Icons.chevronDown
                          size={16}
                          className="arrow ml-1 mt-1 text-paragraph duration-500 group-data-[state=open]:rotate-180 dark:text-white"
                        />
                      </span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="grid w-[600px] grid-cols-3 gap-5">
                      <div>
                        <DropdownMenuItem asChild>
                          <Link href="/components">All</Link>
                        </DropdownMenuItem>
                        {link.submenu
                          .slice(0, Math.ceil(link.submenu.length / 2))
                          .map((sublink, index) => (
                            <DropdownMenuItem key={index} asChild>
                              <Link href={sublink.url}>{sublink.name}</Link>
                            </DropdownMenuItem>
                          ))}
                      </div>
                      <div>
                        {link.submenu
                          .slice(Math.ceil(link.submenu.length / 2))
                          .map((sublink, index) => (
                            <DropdownMenuItem key={index} asChild>
                              <Link href={sublink.url}>{sublink.name}</Link>
                            </DropdownMenuItem>
                          ))}
                        <DropdownMenuItem asChild>
                          <Link href="/components/favourits">Favourits</Link>
                        </DropdownMenuItem>
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </li>
              ) : link.submenu ? (
                <li key={index}>
                  <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild className="group">
                      <span
                        className={`flex cursor-pointer items-center  rounded-large border px-5 py-[5px]  font-sans text-base font-medium leading-8 text-paragraph transition-colors duration-500 hover:bg-white hover:duration-500 dark:text-white dark:hover:bg-dark-200  lg:px-4 xl:px-5
                ${
                  pathname === link.url
                    ? "border-borderColour dark:border-borderColour-dark "
                    : "border-transparent hover:border-borderColour dark:hover:border-borderColour/10 "
                }
                `}
                      >
                        {link.name}
                        <Icons.chevronDown
                          size={16}
                          className="arrow ml-1 mt-1 text-paragraph duration-500 group-data-[state=open]:rotate-180 dark:text-white"
                        />
                      </span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      {link.submenu.map((sublink, index) => (
                        <DropdownMenuItem key={index} asChild>
                          <Link href={sublink.url}>{sublink.name}</Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </li>
              ) : (
                <li key={index} className="group relative">
                  <Link
                    href={link.url}
                    className={`flex items-center rounded-large  border px-5 py-[5px] font-sans  text-base font-medium leading-8 text-paragraph transition-colors duration-500 hover:bg-white hover:duration-500 dark:text-white dark:hover:bg-dark-200 lg:px-4  xl:px-5
                ${
                  pathname === link.url
                    ? "border-borderColour dark:border-borderColour-dark "
                    : "border-transparent hover:border-borderColour dark:hover:border-borderColour/10 "
                }
                `}
                  >
                    {link.name}
                  </Link>
                </li>
              ),
            )}
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

            {session ? (
              <>
                <li className="max-lg:hidden">
                  <Button asChild size={"sm"}>
                    <Link href="/create">
                      <Icons.add />
                      Create
                    </Link>
                  </Button>
                </li>
                <li>
                  <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                      <Avatar className="cursor-pointer">
                        <AvatarImage src={session.user.image!} />
                        <AvatarFallback>
                          {getInitials(session.user.name!)}
                        </AvatarFallback>
                      </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuItem asChild>
                        <Link href={`/profile/${session.user.username}`}>
                          Profile
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => signOut()}>
                        Log out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </li>
              </>
            ) : (
              <li className="max-lg:hidden">
                <Button asChild size={"sm"}>
                  <Link href="/signup">Sign up</Link>
                </Button>
              </li>
            )}
            <li className=" max-lg:inline-block lg:hidden ">
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
            className={`fixed right-0 top-0 z-[111111] mx-auto h-screen w-full rounded-none bg-dark   shadow-nav  transition duration-500 ease-in-out dark:bg-dark max-lg:overflow-y-auto
        ${mobileMenuIsOpen ? "translate-x-0" : "translate-x-full"}
        `}
          >
            <div className="container">
              <div className="flex items-center justify-between pt-8">
                <div className={` ${isHome ? "xl:min-w-[266px]" : ""} `}>
                  <Link href="/" className=" relative h-8 w-8 md:h-12 md:w-12">
                    <Image
                      src="/images/logo.svg"
                      alt="logo"
                      className="dark:hidden"
                      fill
                    />
                    <Image
                      src="/images/logo.svg"
                      alt="logo"
                      className="hidden dark:inline-block"
                      fill
                    />
                  </Link>
                </div>
                <Button
                  size={"icon"}
                  variant={"icon"}
                  onClick={() => setMobileMenuIsOpen(!mobileMenuIsOpen)}
                >
                  <Icons.X />
                </Button>
              </div>
              <div className="py-10">
                <ul className="flex w-full flex-col gap-1">
                  {navLinks.map((link, index) =>
                    link.submenu ? (
                      <li
                        key={index}
                        className="group relative"
                        onClick={(e) =>
                          e.currentTarget.classList.toggle("open")
                        }
                      >
                        <span
                          className={`flex cursor-pointer items-center justify-between rounded-large px-5 py-2.5 font-sans text-lg font-medium leading-8 text-white transition-colors duration-500 hover:duration-500 dark:hover:bg-dark-200 lg:px-4  xl:px-5 ${
                            pathname === link.url
                              ? "bg-dark-300"
                              : "hover:bg-dark-300"
                          }`}
                        >
                          {link.name}
                          <Icons.chevronDown
                            size={16}
                            className="stroke-white duration-500 group-[.open]:rotate-180"
                          />
                        </span>
                        <ul className="flex max-h-0 w-full flex-col gap-1 overflow-hidden transition-all duration-700 group-[.open]:max-h-96">
                          {link.submenu.map((item, index) => (
                            <li key={index} className="group relative">
                              <Link
                                href={item.url}
                                className={`flex  items-center rounded-large px-5 py-2.5 font-sans text-lg font-medium leading-8 text-white transition-colors duration-500 hover:duration-500 dark:hover:bg-dark-200 lg:px-4  xl:px-5 ${
                                  pathname === item.url
                                    ? "bg-dark-300"
                                    : "hover:bg-dark-300"
                                }`}
                              >
                                {item.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                    ) : (
                      <li key={index} className="group relative">
                        <Link
                          href={link.url}
                          className={`flex  items-center rounded-large px-5 py-2.5 font-sans text-lg font-medium leading-8 text-white transition-colors duration-500 hover:duration-500 dark:hover:bg-dark-200 lg:px-4  xl:px-5 ${
                            pathname === link.url
                              ? "bg-dark-300"
                              : "hover:bg-dark-300"
                          }`}
                        >
                          {link.name}
                        </Link>
                      </li>
                    ),
                  )}
                </ul>
                <div className="my-5 h-0.5 bg-dark-300"></div>
                {session ? (
                  <Button asChild>
                    <Link href="/create">
                      <Icons.add />
                      Create
                    </Link>
                  </Button>
                ) : (
                  <Button asChild>
                    <Link href="/signup">Sign up</Link>
                  </Button>
                )}
              </div>
            </div>
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
