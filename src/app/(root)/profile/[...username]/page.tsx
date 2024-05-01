import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/Button";
import { db } from "@/server/db";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";
import { getServerAuthSession } from "@/server/auth";
import ManageProfile from "./_manage";
import ComponentCard from "@/components/ComponentCard";
import Link from "next/link";
import UserImage from "public/images/user.jpg";
import { includeComponent } from "@/lib/prisma/includeComponent";
import { type ComponentStatus } from "@prisma/client";
import AvatarUpload from "./_avatar";
import Filters from "../../components/_filters";
import { componentFilters } from "@/lib/prisma/componentFilters";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Pagination from "../../components/_pagination";
import { componentsPerPage } from "@/lib/config";
import { Link2, Pin } from "lucide-react";
import { Logos } from "@/components/Logos";

interface Props {
  searchParams: {
    page?: number;
    category?: string;
    sortBy?: string;
    query?: string;
    type?: string;
  };
  params: {
    username: string;
  };
}

const page = async ({ params, searchParams }: Props) => {
  const page = searchParams.page ?? 1;
  if (page < 1) {
    return notFound();
  }

  const status = params.username[1] ?? "published";
  let compStatus = status;
  switch (status) {
    case "published":
      compStatus = "PUBLISHED";
      break;
    case "review":
      compStatus = "REVIEW";
      break;
    case "rejected":
      compStatus = "REJECTED";
      break;
    case "draft":
      compStatus = "DRAFT";
      break;
    default:
      return notFound();
  }
  const user = await db.user.findUnique({
    where: {
      username: params.username[0],
    },
  });

  if (!user) {
    return notFound();
  }

  const session = await getServerAuthSession();

  // if status is not published and user is not the owner
  if (compStatus !== "PUBLISHED" && user.id !== session?.user.id) {
    return notFound();
  }

  const [count, components] = await db.$transaction([
    db.component.count({
      ...componentFilters({
        searchParams,
        type: "profile",
        status: compStatus as ComponentStatus,
        userId: user.id,
      }),
    }),
    db.component.findMany({
      take: componentsPerPage,
      skip: (page - 1) * componentsPerPage,
      ...componentFilters({
        searchParams,
        type: "profile",
        status: compStatus as ComponentStatus,
        userId: user.id,
      }),
      include: includeComponent(session?.user.id),
    }),
  ]);

  const tabs = [
    {
      name: "Published",
      slug: "published",
      icon: <Icons.check className="text-green-400" />,
      color: "text-green-400 dark:text-green-400",
      onlyOwner: false,
    },
    {
      name: "Reviewed",
      slug: "review",
      icon: <Icons.clock className="text-yellow-400" />,
      color: "text-yellow-400 dark:text-yellow-400",
      onlyOwner: true,
    },
    {
      name: "Rejected",
      slug: "rejected",
      icon: <Icons.X className="text-red-400" />,
      color: "text-red-400 dark:text-red-400",
      onlyOwner: true,
    },
    {
      name: "Drafts",
      slug: "draft",
      icon: <Icons.folderOpen className="text-blue-400" />,
      color: "text-blue-400 dark:text-blue-400",
      onlyOwner: true,
    },
  ];

  const isOwner = session?.user?.id === user.id;
  const totalPages = Math.ceil(count / componentsPerPage);

  console.log(count, totalPages);

  return (
    <main className="container relative mb-[150px]  min-h-screen  pt-[120px] max-md:mb-[100px]">
      <section className="flex w-full flex-col gap-5 md:flex-row">
        {isOwner ? (
          <AvatarUpload />
        ) : (
          <Image
            className="rounded-lg object-cover"
            src={user.image ?? UserImage}
            alt={user.name + ""}
            width={200}
            height={200}
          />
        )}
        <aside className="flex w-full items-start justify-between gap-2">
          <div>
            <h2 className="text-2xl md:text-4xl">
              {isOwner ? session.user.name : user.name}
            </h2>
            <h2 className="username text-base font-semibold text-gray-500 dark:text-gray-500">
              @{user.username}
            </h2>
            <div className="mt-4">
              <p>{user.bio}</p>
              <div className="details mt-1 flex flex-wrap gap-x-3 gap-y-1 font-semibold text-gray-500 dark:text-gray-500">
                {user.location && (
                  <div className="flex items-center gap-2">
                    <Pin size={16} />
                    {user.location}
                  </div>
                )}
                {user.website && (
                  <div className="flex items-center gap-2 ">
                    <Link2 size={16} />
                    <Link
                      href={user.website}
                      target="_blank"
                      className="font-semibold text-gray-500 transition-colors hover:text-dark dark:text-gray-500 dark:hover:text-white"
                    >
                      {user.website}
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
          {isOwner && <ManageProfile user={user} />}
        </aside>
      </section>

      <div className=" mt-10 flex w-full flex-col items-center justify-between sm:flex-row">
        <div className="  hidden flex-wrap gap-1 xl:flex">
          {tabs.map((tab, index) => (
            <Link
              key={index}
              className={`flex items-center gap-2 rounded-md px-6 py-2 pl-5 text-base font-semibold  hover:bg-gray dark:hover:bg-dark ${status === tab.slug && "bg-gray dark:bg-dark-200"} ${status === tab.slug && tab.color} ${tab.onlyOwner && !isOwner && "hidden"}`}
              href={`/profile/${user.username}/${tab.slug}`}
            >
              {tab.icon}
              {tab.name}
            </Link>
          ))}
          {isOwner && (
            <Link
              className={`flex items-center gap-2 rounded-md px-6 py-2 pl-5 text-base font-semibold  hover:bg-gray dark:hover:bg-dark`}
              href={`/components/favourites`}
            >
              <Icons.heart className="text-red-400" /> Favourites
            </Link>
          )}
        </div>
        <div className="xl:hidden">
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild className="group">
              <span
                className={`flex cursor-pointer items-center gap-2 rounded-xl border border-transparent px-5 py-[5px] font-sans  text-base font-medium capitalize leading-8 text-paragraph transition-colors duration-500 hover:border-borderColour hover:bg-white hover:duration-500 data-[state=open]:border-primary  dark:text-white dark:hover:bg-dark-200 lg:px-4 xl:px-5`}
              >
                {tabs.find((tab) => tab.slug === status)?.icon}
                <span className="max-md:hidden">Status :</span> {status}
                <Icons.chevronDown
                  size={16}
                  className="arrow ml-1 mt-1 text-paragraph duration-500 group-data-[state=open]:rotate-180 dark:text-white"
                />
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              {tabs.map((item, index) => (
                <DropdownMenuItem
                  key={index}
                  className={`gap-2 ${status === item.slug && "before:scale-x-100"}  ${item.onlyOwner && !isOwner && "hidden"}`}
                  asChild
                >
                  <Link href={`/profile/${user.username}/${item.slug}`}>
                    {item.icon}
                    {item.name}
                  </Link>
                </DropdownMenuItem>
              ))}
              {/* favourits */}
              {isOwner && (
                <DropdownMenuItem className={`gap-2 `} asChild>
                  <Link href={`/components/favourites`}>
                    <Icons.heart className="text-red-400" /> Favourites
                  </Link>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div>
          <Filters />
        </div>
      </div>

      {components.length > 0 ? (
        <>
          <div className="mt-5 grid grid-cols-3 items-stretch  gap-8 max-lg:grid-cols-2 max-sm:grid-cols-1">
            {components.map((item, index) => (
              <ComponentCard key={index} component={item} session={session} />
            ))}
          </div>
          <Pagination totalPages={totalPages} />
        </>
      ) : null}
      {components.length === 0 && isOwner ? (
        <div className="mt-[10px] overflow-hidden rounded-xl border-2 border-solid border-gray-700">
          <div className="flex h-full flex-col items-center justify-center px-8 py-12 text-center">
            {compStatus === "PUBLISHED" && (
              <p className="mb-6 text-gray-400">
                It looks like you&apos;re new here. Don&apos;t be shy, click the
                &apos;Create&apos; button and introduce yourself to the rest of
                the galaxy.
              </p>
            )}
            {compStatus !== "PUBLISHED" && (
              <p className="mb-6 text-gray-400">
                Nothing here, check your published components or create one now.
              </p>
            )}

            <Button asChild>
              <Link href="/create">
                <Icons.add />
                Create
              </Link>
            </Button>
          </div>
        </div>
      ) : null}
      {components.length === 0 && compStatus === "PUBLISHED" && !isOwner ? (
        <div className="mt-10 overflow-hidden rounded-xl border-2 border-solid border-gray-700">
          <div className="flex h-full flex-col items-center justify-center px-8 py-12 text-center">
            <p className="mb-6 text-gray-400">
              This user has not shared any components yet.
            </p>
          </div>
        </div>
      ) : null}
    </main>
  );
};

export default page;
