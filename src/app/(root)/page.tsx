import { Grids } from "@/components/Grids";
import React from "react";

const page = () => {
  return (
    <>
      <section
        className="bg-gray dark:bg-dark max-mb:pb-[70px] relative overflow-hidden pb-[140px] pt-[230px] max-lg:pb-[100px] max-lg:pt-[160px]"
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
                <span className="font-playfair border-paragraph inline-block rounded-[88px] border-2 bg-[#D9D9D900] px-5 pb-2.5 pt-0.5 italic leading-none dark:border-[#F0F3EA]">
                  Share
                </span>
                Web Components.
              </h1>
              <p className="mb-12 max-w-[590px] max-md:mb-8">
                We provide a simple and easy way to explore and share web
                components, making it easier for developers to build their next
                dream project 🚀.
              </p>
              {/* <form>
                <div className="dark:bg-dark-200 border-borderColour grid w-full max-w-[520px] grid-cols-12 items-center rounded-[60px] border bg-white pb-1 pe-1 pl-4 pt-1 sm:pl-5 dark:border-[#31332F]">
                  <input
                    type="text"
                    placeholder="Enter your email"
                    className=" xs:col-span-8 placeholder:text-light text-light focus:border-primary col-span-8 bg-transparent leading-[1.75] text-[#A1A49D] outline-none  transition-all duration-300 focus:outline-none dark:placeholder:text-[#A1A49D] "
                  />
                  <button className="btn xs:col-span-4 col-span-4 max-lg:!px-3 max-lg:!text-sm ">
                    Get Started
                  </button>
                </div>
              </form> */}
            </div>
            <div className="col-span-12 md:col-span-6 ">
              <div className="lg:ml-[60px] relative min-h-[530px] w-full max-md:min-h-[400px]">
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
    </>
  );
};

export default page;
