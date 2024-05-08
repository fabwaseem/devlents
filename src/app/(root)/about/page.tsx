import React from "react";

const page = () => {
  return (
    <>
      <section className="max-lg:pt-150 relative overflow-hidden pb-[60px] pt-[240px]">
        <div className="container">
          <div
            className="mx-auto max-w-[948px] text-center"

          >
            <p className="mb-4 font-medium uppercase">about devlents</p>
            <h1 className="mb-10 max-lg:mb-10">
              A community for developers
            </h1>
            <p className="mx-auto mb-12 max-w-[590px] max-lg:mb-10">
              We provide a simple and easy way to explore and share web
              components, making it easier for developers to build their next
              dream project 🚀.
            </p>
          </div>
        </div>
      </section>
      {/* <section className="relative">
        <div className="container relative ">
          <div className="absolute left-1/2 top-1/2  flex -translate-x-1/2 -translate-y-1/2 max-sm:hidden">
            <div className="h-[330px] w-[330px] rounded-full bg-primary-200/20 blur-[145px] xl:h-[442px] xl:w-[442px] " />
            <div className="h-[330px] w-[330px] rounded-full bg-primary-200/25 blur-[145px] lg:-ml-[170px] xl:h-[442px] xl:w-[442px]" />
            <div className="lg-ml-[170px] h-[330px] w-[330px] rounded-full bg-primary-200/20 blur-[145px] xl:h-[442px] xl:w-[442px]" />
          </div>
          <div className="max-md:mb-25 relative z-10 mb-[160px] grid  grid-cols-3 items-center gap-10 max-md:grid-cols-1">
            <div
              className="rounded-medium  overflow-hidden bg-white p-2.5 shadow-box dark:bg-dark-200"

            >
              <img
                src="images/about/about1.png"
                alt="about images"
                className="w-full rounded"
              />
            </div>
            <div
              className="rounded-medium  overflow-hidden bg-white p-2.5 shadow-box dark:bg-dark-200"

            >
              <img
                src="images/about/about2.png"
                alt="about images"
                className="w-full rounded"
              />
            </div>
            <div
              className="rounded-medium  overflow-hidden bg-white p-2.5 shadow-box dark:bg-dark-200"

            >
              <img
                src="images/about/about3.png"
                alt="about images"
                className="w-full rounded"
              />
            </div>
          </div>
          <div className="relative z-10 grid grid-cols-12">
            <div className="max-md:col-span-full md:col-span-6">
              <div className="max-w-[550px]">
                <p className="section-tagline">Lorem</p>
                <h2>More than 10 years experience in this industry</h2>
              </div>
            </div>
            <div className="max-w-[590px] py-10 max-md:col-span-full md:col-span-6">
              <p>
                Lorem ipsum dolor sit amet consectetur. Nulla lobortis lacus
                nunc pulvinar amet. Id dignissim ipsum quis varius. Accumsan
                ultricies dapibus rutrum parturient mauris at est habitasse.
                <br />
                <br />
                Risus egestas neque. Nunc diam arcu purus egestas at dignissim
                nunc. In nec donec sed pretium donec eros elementum. Nec
                bibendum vel odio convallis feugiat viverra rhoncus in risus.
                Pretium ante nibh morbi sed consequat sem quam pharetra. Et
                cursus mattis senectus aliquet.
              </p>
            </div>
          </div>
        </div>
      </section> */}
      {/* <section className="max-md:pb-25 bg-white pb-[170px] pt-[150px] dark:bg-dark-300 max-md:overflow-hidden max-md:pt-20">
        <div className="container">
          <div className="mx-auto mb-12 max-w-[475px] text-center">
            <p className="section-tagline">Our Team</p>
            <h2>Our leading, strong and creative team</h2>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 -z-10 flex -translate-x-1/2 -translate-y-1/2 max-md:top-0 max-md:hidden max-md:flex-col md:top-1/2">
              <div className="max-1xl:w-[335px] max-1xl:h-[335px]  1xl:w-[442px] 1xl:h-[442px]  rounded-full bg-primary-200/20 blur-[145px]" />
              <div className="max-1xl:w-[335px] max-1xl:h-[335px]  1xl:w-[442px] 1xl:h-[442px]  -ml-[170px] rounded-full bg-primary-200/25 blur-[145px] max-md:ml-0" />
              <div className="max-1xl:w-[335px] max-1xl:h-[335px]  1xl:w-[442px] 1xl:h-[442px]  -ml-[170px] rounded-full bg-primary-200/20 blur-[145px] max-md:ml-0" />
            </div>
            <div className=" grid grid-cols-3 gap-8 max-md:grid-cols-1">
              {team.map((item, index) => (
                <div key={index} className="group/image">
                  <div className="rounded-medium mb-6 bg-white p-2.5 dark:bg-dark-200">
                    <div className="relative min-h-96 overflow-hidden rounded bg-gray-100 dark:bg-[#30302F]">
                      <Image
                        src={item.image}
                        alt={item.name}
                        className="grayscale transition-all duration-300 group-hover/image:grayscale-0 object-cover"
                        fill
                        sizes="20vw"
                      />
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="mb-2">{item.name}</h3>
                    <p className="mb-6 text-sm font-medium leading-[1.5]">
                      {item.position}
                    </p>
                    <ul className="flex items-center justify-center gap-x-2.5">
                      {item.socialLinks.map((link, index) => (
                        <li key={index}>
                          <Link
                            href={link.url}
                            className="group transition-colors duration-500 hover:transition-colors hover:duration-500"
                            target="_blank"
                          >
                            <link.icon />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section> */}
    </>
  );
};

export default page;
