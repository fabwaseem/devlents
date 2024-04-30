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
  const perPage = 15;
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

  const components = await db.component.findMany({
    take: perPage,
    skip: perPage * (page - 1),
    ...componentFilters({
      searchParams,
      type: "profile",
      status: compStatus as ComponentStatus,
      userId: user.id,
    }),
    include: includeComponent(session?.user.id),
  });

  const tabs = [
    {
      name: "Published",
      slug: "published",
      icon: <Icons.check className="text-green-400" />,
      color: "text-green-400 dark:text-green-400",
    },
    {
      name: "Reviewed",
      slug: "review",
      icon: <Icons.clock className="text-yellow-400" />,
      color: "text-yellow-400 dark:text-yellow-400",
    },
    {
      name: "Rejected",
      slug: "rejected",
      icon: <Icons.X className="text-red-400" />,
      color: "text-red-400 dark:text-red-400",
    },
    {
      name: "Drafts",
      slug: "draft",
      icon: <Icons.folderOpen className="text-blue-400" />,
      color: "text-blue-400 dark:text-blue-400",
    },
  ];

  const isOwner = session?.user?.id === user.id;

  return (
    <main className="container relative mb-[150px]  min-h-screen  pt-[120px] max-md:mb-[100px]">
      <section className="flex w-full gap-5">
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
        <aside className="flex w-full flex-col justify-between md:flex-row md:items-start">
          <div>
            <h2>{isOwner ? session.user.name : user.name}</h2>
            <h2 className="username text-base font-semibold text-gray-500">
              @{user.username}
            </h2>
            <div className="bio" />
          </div>
          {isOwner && <ManageProfile user={user} />}
        </aside>
      </section>
      {isOwner && (
        <div className=" mt-10 flex w-full items-center justify-between">
          <div className=" flex flex-wrap gap-1">
            {tabs.map((tab, index) => (
              <Link
                key={index}
                className={`flex items-center gap-2 rounded-md px-6 py-2 pl-5 text-base font-semibold  hover:bg-gray dark:hover:bg-dark ${status === tab.slug && "bg-gray dark:bg-dark-200"} ${status === tab.slug && tab.color}`}
                href={`/profile/${user.username}/${tab.slug}`}
              >
                {tab.icon}
                {tab.name}
              </Link>
            ))}
            <Link
              className={`flex items-center gap-2 rounded-md px-6 py-2 pl-5 text-base font-semibold  hover:bg-gray dark:hover:bg-dark`}
              href={`/components/favourites`}
            >
              <Icons.heart className="text-red-400" /> Favourites
            </Link>
          </div>
          <div>
            <Filters />
          </div>
        </div>
      )}
      {components.length > 0 ? (
        <div className="mt-5 grid grid-cols-3  gap-8 max-lg:grid-cols-2 max-sm:grid-cols-1">
          {components.map((item, index) => (
            <ComponentCard key={index} component={item} session={session} />
          ))}
        </div>
      ) : null}
      {components.length === 0 && isOwner ? (
        <div className="mt-[10px] overflow-hidden rounded-xl border-2 border-solid border-gray-700">
          <div className="flex h-full flex-col items-center justify-center px-24 py-12 text-center">
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
          <div className="flex h-full flex-col items-center justify-center px-24 py-12 text-center">
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
