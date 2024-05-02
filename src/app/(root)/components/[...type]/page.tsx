import ComponentCard from "@/components/ComponentCard";
import { db } from "@/server/db";
import React from "react";

import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Icons } from "@/components/Icons";

import { includeComponent } from "@/lib/prisma/includeComponent";
import { getServerAuthSession } from "@/server/auth";
import Filters from "../_filters";
import SearchForm from "../../SearchForm";
import Pagination from "../_pagination";
import { componentTypes, componentsPerPage } from "@/lib/config";
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
    type: string[];
  };
}
const page = async ({ searchParams, params }: Props) => {
  const type = params.type[0];
  let componentType = componentTypes.find((item) => item.value === type);
  if (!componentType) {
    if (type === "favourites") {
      componentType = {
        label: "Favourites",
        value: "favourites",
      };
    } else {
      return notFound();
    }
  }

  const page = searchParams.page ?? 1;
  if (page < 1) {
    return notFound();
  }
  const session = await getServerAuthSession();

  const [count, components] = await db.$transaction([
    db.component.count({
      ...componentFilters({
        searchParams,
        type: "componentstypes",
        status: "PUBLISHED",
        userId: session?.user.id,
        compType: type as "favourites" | "css" | "tailwind",
        session,
      }),
    }),
    db.component.findMany({
      take: componentsPerPage,
      skip: componentsPerPage * (page - 1),
      ...componentFilters({
        searchParams,
        type: "componentstypes",
        status: "PUBLISHED",
        userId: session?.user.id,
        compType: type as "favourites" | "css" | "tailwind",
        session,
      }),
      include: includeComponent(session?.user.id),
    }),
  ]);

  const totalPages = Math.ceil(count / componentsPerPage);

  return (
    <section className="relative  mb-[150px] min-h-screen pt-[150px] max-md:mb-[100px]">
      <div className="container">
        <div className="flex flex-col items-center justify-between lg:flex-row">
          <Filters />
          <div className="w-full max-w-[320px]">
            <SearchForm type="COMPONENTS" />
          </div>
        </div>
        {components.length ? (
          <>
            <div className=" mt-5 grid grid-cols-3 items-stretch  gap-8 max-lg:grid-cols-2 max-sm:grid-cols-1">
              {components.map((item, index) => (
                <ComponentCard key={index} component={item} session={session} />
              ))}
            </div>
            <Pagination totalPages={totalPages} />
          </>
        ) : (
          <article className="mt-[10px] overflow-hidden rounded-xl border-2 border-solid border-gray-700">
            <div className="flex h-full flex-col items-center justify-center px-8 py-12 text-center">
              <p className="mb-6 text-gray-400">
                Nothing here, try to tweak your filters or adjust the search
                query or create one now.
              </p>
              <Button asChild>
                <Link href="/create">
                  <Icons.add />
                  Create
                </Link>
              </Button>
            </div>
          </article>
        )}
      </div>
    </section>
  );
};

export default page;
