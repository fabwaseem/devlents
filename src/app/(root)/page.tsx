import ComponentCard from "@/components/ComponentCard";
import { Grids } from "@/components/Grids";
import { Icons } from "@/components/Icons";
import { Avatar, AvatarFallback } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { languagesLogos } from "@/lib/config";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <>
      {/* HERO SECTION */}
      <section
        className="max-mb:pb-[70px] relative overflow-hidden bg-gray pb-[140px] pt-[230px] dark:bg-dark max-lg:pb-[100px] max-lg:pt-[160px]"
        id="scene"
      >
        <div className="absolute left-1/2 top-0 max-w-[1612px] -translate-x-1/2 max-lg:hidden">
          <Grids.top />
        </div>
        <div className="absolute bottom-0 left-0 w-full max-lg:hidden">
          <Grids.bottom />
        </div>
        <div className="absolute left-1/2 top-0 max-w-[1612px] -translate-x-1/2 lg:hidden">
          <Grids.smTop />
        </div>
        <div className="absolute bottom-0 left-0 w-full lg:hidden">
          <Grids.smBottom />
        </div>
        <div className="container">
          <div
            className="relative z-10 grid grid-cols-12  items-center max-lg:gap-y-10"
            data-aos="fade-up"
            data-aos-offset={200}
            data-aos-duration={1000}
            data-aos-once="true"
          >
            <div className="col-span-12 md:col-span-6 ">
              <p className="mb-8 font-medium uppercase max-lg:mb-4">
                10k+ Components
              </p>
              <h1 className="mb-12 max-md:mb-8">
                Discover and{" "}
                <span className="inline-block rounded-[88px] border-2 border-paragraph bg-[#D9D9D900] px-5 pb-2.5 pt-0.5 font-playfair italic leading-none dark:border-[#F0F3EA]">
                  Share
                </span>
                Web Components.
              </h1>
              <p className="mb-12 max-w-[590px] max-md:mb-8">
                We provide a simple and easy way to explore and share web
                components, making it easier for developers to build their next
                dream project 🚀.
              </p>
              <form>
                <div className="grid w-full max-w-[520px] grid-cols-12 items-center rounded-[60px] border border-borderColour bg-white pb-1 pe-1 pl-4 pt-1 dark:border-[#31332F] dark:bg-dark-200 sm:pl-5">
                  <input
                    type="text"
                    placeholder="Search for components"
                    className="col-span-8 bg-transparent leading-[1.75] text-[#A1A49D] outline-none transition-all duration-300 focus:outline-none dark:placeholder:text-[#A1A49D] "
                  />
                  <Button className="col-span-4 max-lg:!px-3 max-lg:!text-sm ">
                    Search
                  </Button>
                </div>
              </form>
            </div>
            <div className="col-span-12 md:col-span-6 ">
              <div className="relative min-h-[530px] w-full max-md:min-h-[400px] lg:ml-[60px]">
                <div className="absolute  !left-1/2 !top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <img
                    src="images/hero/hero-circle.png"
                    alt="hero Image"
                    className="inline-block dark:hidden"
                  />
                  <img
                    src="images/hero/hero-circle-dark.png"
                    alt="hero Image"
                    className="hidden dark:inline-block"
                  />
                </div>
                <div
                  className="!top-15 parallax-effect absolute !-left-[40px] max-lg:!left-0 max-lg:aspect-video max-lg:w-[220px] max-md:!top-5 lg:!-top-[20px]"
                  parallax-value={-1}
                  data-aos="fade-up"
                  data-aos-offset={200}
                  data-aos-duration={1000}
                  data-aos-once="true"
                >
                  <img
                    src="images/hero/hero-policy.png"
                    alt="hero Image"
                    className="inline-block dark:hidden"
                  />
                  <img
                    src="images/hero/hero-policy-dark.png"
                    alt="hero Image"
                    className="hidden dark:inline-block"
                  />
                </div>
                <div
                  className="parallax-effect absolute !bottom-[150px] !left-[50px] max-lg:aspect-square max-lg:w-28 max-md:!bottom-[70px] max-md:!left-[50px]  lg:!bottom-0 lg:!left-[45px] xl:!left-[85px]"
                  parallax-value={1}
                  data-aos="fade-up"
                  data-aos-offset={200}
                  data-aos-duration={1000}
                  data-aos-once="true"
                >
                  <img
                    src="images/hero/hero-rating.png"
                    alt="hero Image"
                    className="inline-block dark:hidden"
                  />
                  <img
                    src="images/hero/hero-rating-dark.png"
                    alt="hero Image"
                    className="hidden dark:inline-block"
                  />
                </div>
                <div
                  className="lg:!not-sr-only-bottom-[45px] parallax-effect absolute !-bottom-0 !-right-5 max-lg:w-[196px] max-md:!-bottom-5 max-md:!-right-5 lg:right-0 xl:right-[30px]"
                  parallax-value={2}
                  data-aos="fade-left"
                  data-aos-offset={200}
                  data-aos-duration={1000}
                  data-aos-once="true"
                >
                  <img
                    src="images/hero/hero-chart.png"
                    alt="hero Image"
                    className="inline-block dark:hidden"
                  />
                  <img
                    src="images/hero/hero-chart-dark.png"
                    alt="hero Image"
                    className="hidden dark:inline-block"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories SECTION */}
      <section className="client bg-white pb-[145px] pt-[140px] dark:bg-dark-300 max-lg:py-20">
        <div className="container  overflow-hidden max-lg:!px-0">
          <div className=" px-10px mx-auto max-w-[550px] text-center max-lg:px-2.5">
            <h2 className="mb-10">The components available on devlents</h2>
            <p className="text-light mb-[60px]">
              Easy to use, easy to share, and easy to find. We have a wide range
              of components available for you to use in your next project.
            </p>
          </div>
          <div className="relative before:absolute before:-right-0.5 before:top-1/2 before:z-10 before:h-[80px] before:w-[120px] before:-translate-y-1/2  before:bg-gradient-to-l before:from-white before:from-[37.5%] after:absolute after:-left-0.5 after:top-1/2 after:z-10 after:h-[80px] after:w-[120px] after:-translate-y-1/2  after:bg-gradient-to-r after:from-white  after:from-[37.5%] dark:before:from-dark-300 dark:after:from-dark-300">
            <div className="absolute left-0 top-0 flex  h-full w-full flex-col justify-between max-lg:hidden">
              <img
                src="images/separator.svg"
                alt="border"
                className="inline-block dark:hidden"
              />
              <img
                src="images/separator.svg"
                alt="border"
                className="inline-block dark:hidden"
              />
              <img
                src="images/separator-dark.svg"
                alt="border"
                className=" hidden dark:inline-block "
              />
              <img
                src="images/separator-dark.svg"
                alt="border"
                className="hidden dark:inline-block "
              />
            </div>
            <div className="marquee marquee-items">
              <div
                className="marquee-content flex items-center justify-between py-8 "
                id="clients"
              >
                {languagesLogos.map((item, index) => (
                  <Link
                    key={index}
                    href={item.url}
                    className="marquee-content-list"
                  >
                    <item.logo />
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-[60px] flex items-center justify-center ">
            <Button variant={"outline"} asChild>
              <Link href={"components"}>Browse All Categories</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* POPULAR SECTION */}
      <section className="relative bg-white pb-[150px] dark:bg-dark-300 max-sm:overflow-hidden">
        <div className="top-25 absolute left-0 right-0 h-full w-full  bg-cover bg-center bg-no-repeat opacity-70  sm:hidden" />
        <div className="container ">
          <div className="mb-12">
            <p className="section-tagline max-lg:text-center">
              Popular components
            </p>
            <div className="block max-lg:text-center lg:flex">
              <h2 className=" max-lg:mb-5">
                Components that are trending <br /> right now
              </h2>
              <p className="max-w-[520px] lg:ml-auto">
                We have a wide range of components available for you to use in
                your next project. Here are some of the most popular ones.
              </p>
            </div>
          </div>
          <div className="relative z-10">
            <div className="absolute left-1/2 top-1/2 -z-10 flex -translate-x-1/2 -translate-y-1/2 max-sm:hidden">
              <div className="h-[330px] w-[330px] rounded-full bg-primary-200/20 blur-[145px] xl:h-[442px] xl:w-[442px] " />
              <div className="h-[330px] w-[330px] rounded-full bg-primary-200/25 blur-[145px] lg:-ml-[170px] xl:h-[442px] xl:w-[442px]" />
              <div className="lg-ml-[170px] h-[330px] w-[330px] rounded-full bg-primary-200/20 blur-[145px] xl:h-[442px] xl:w-[442px]" />
            </div>
            <div className="grid grid-cols-3  gap-8 max-lg:grid-cols-2 max-sm:grid-cols-1">
              <ComponentCard />
              <ComponentCard />
              <ComponentCard />
              <ComponentCard />
              <ComponentCard />
              <ComponentCard />
            </div>
            <div className="mt-[60px] flex items-center justify-center ">
              <Button variant={"outline"} asChild>
                <Link href={"/components"}>See All Components</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="relative overflow-hidden bg-gray pb-[145px] pt-[135px] dark:bg-dark max-md:py-20">
        <div className="absolute left-1/2 top-0 max-w-[1612px] -translate-x-1/2  max-md:hidden">
          <Grids.top />
        </div>
        <div className="absolute bottom-0 left-0 w-full max-md:hidden">
          <Grids.bottom />
        </div>
        <div className="absolute left-1/2 top-0 -translate-x-1/2 md:hidden">
          <Grids.smCta />
        </div>
        <div className="container relative z-10">
          <div className=" mx-auto   text-center">
            <h2 className="mb-5 text-[48px] font-semibold max-lg:text-[32px]">
              Sign up now <br />
              To get access to all components
            </h2>
            <p className="mx-auto mb-12 max-w-[400px] max-lg:mt-6">
              By using custom Web components for your website, you can bring
              your vision to life.
            </p>
            <Button variant={"outline"} asChild className="mx-auto w-max">
              <Link href={"/components"}>Sign up now</Link>
            </Button>
            <ul className=" mx-auto mt-20 flex max-w-[815px] items-center justify-between max-lg:mt-5 max-md:flex-col max-md:gap-5">
              <li className="flex items-center">
                <Icons.checmarkCircle />
                <p>No Credit Card Required</p>
              </li>
              <li className="flex items-center">
                <Icons.checmarkCircle />
                <p>No Credit Card Required</p>
              </li>
              <li className="flex items-center">
                <Icons.checmarkCircle />
                <p>No Credit Card Required</p>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
