import { contactDetails, footerLinks, socialLinks } from "@/lib/config";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-white pt-20 dark:bg-dark-300">
      <div className="container">
        <div className="mb-20 grid grid-cols-12 max-lg:gap-y-10 max-lg:text-center">
          <div className="col-span-12 lg:col-span-6">
            <Image
              src="/images/logo.svg"
              alt="logo"
              className="mb-10 inline-block dark:hidden"
              width={70}
              height={70}
            />
            <Image
              src="/images/logo.svg"
              alt="logo dark version"
              className="mb-10 hidden  dark:inline-block"
              width={70}
              height={70}
            />
            <p className="max-w-[350px] max-lg:mx-auto">
              Devlent is a simple and easy way to explore and share web
              components, making it easier for developers to build their next
              dream project.
            </p>
          </div>
          <div className="col-span-12 max-lg:text-center sm:col-span-4 lg:col-span-2">
            <h3 className="mb-8 text-lg font-medium">Explore</h3>
            <ul className="[&>*:not(:last-child)]:mb-3">
              {footerLinks?.Explore.map((link, index) => (
                <li key={index}>
                  <Link href={link.url} className="link-btn">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-12 max-lg:text-center sm:col-span-4 lg:col-span-2">
            <h3 className="mb-8 text-lg font-medium">Components</h3>
            <ul className="[&>*:not(:last-child)]:mb-3">
              {footerLinks?.Components.splice(0, 4).map((link, index) => (
                <li key={index}>
                  <Link href={link.url} className="link-btn">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-12 max-lg:text-center sm:col-span-4 lg:col-span-2">
            <h3 className="mb-8 text-lg font-medium">Get In touch</h3>
            <p className="mb-3">Need Support?</p>
            <p className="mb-3">
              <a href={`mailto:${contactDetails.email}`} className="link-btn">
                {contactDetails.email}
              </a>
            </p>
            <p className="mb-3">
              <a href={`tel:${contactDetails.phone}`} className="link-btn">
                {contactDetails.phone}
              </a>
            </p>
            <ul className="social-link flex items-center gap-4 max-lg:justify-center">
              {socialLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.url}
                    className="fill-paragraph transition-all hover:fill-primary dark:fill-gray-100 dark:hover:fill-primary"
                  >
                    <link.icon />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <Image
            src="/images/footer-seperator.svg"
            alt="footer-seperator"
            className="w-full object-cover dark:hidden"
            width={1000}
            height={10}
          />
          <Image
            src="/images/footer-seperator-dark.svg"
            alt="footer-seperator"
            className="hidden w-full object-cover dark:block"
            width={1000}
            height={10}
          />
        </div>
        <div className="py-10 max-lg:text-center">
          <div className="flex max-lg:flex-col lg:items-center">
            <p className="max-lg:mb-10">
              @ {new Date().getFullYear()} Devlents. All Rights Reserved
            </p>
            <ul className="gap-15 flex items-center gap-5  max-lg:justify-center lg:ml-auto">
              <li>
                <Link href="privacy-policy" className="link-btn">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="terms-conditions" className="link-btn">
                  Terms &amp; Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
