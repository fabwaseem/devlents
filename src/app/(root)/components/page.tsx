import ComponentCard from "@/components/ComponentCard";
import { db } from "@/server/db";
import React from "react";
import Pagination from "./_pagination";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Icons } from "@/components/Icons";
import Filters from "./_filters";

interface Props {
  searchParams: {
    page?: number;
    category?: string;
    sortBy?: string;
  };
}
const page = async ({ searchParams }: Props) => {
  const perPage = 15;
  const page = searchParams.page ?? 1;
  if (page < 1) {
    return notFound();
  }
  const sortBy = searchParams.sortBy ?? "latest";

  let sort = {};
  if (sortBy === "latest") {
    sort = { createdAt: "desc" };
  } else if (sortBy === "favourites") {
    sort = { favourites: "desc" };
  } else if (sortBy === "views") {
    sort = { views: "desc" };
  } else if (sortBy === "upvotes") {
    sort = { upvotes: "desc" };
  }

  const [count, components] = await db.$transaction([
    db.component.count(),
    db.component.findMany({
      take: perPage,
      skip: perPage * (page - 1),
      where: {
        status: "review",
        category: { slug: searchParams.category },
      },
      orderBy: sort,
      include: {
        user: true,
        category: true,
      },
    }),
  ]);

  const totalPages = Math.ceil(count / perPage);

  return (
    <section className="relative  mb-[150px] min-h-screen pt-[150px] max-md:mb-[100px]">
      <div className="container">
        <Filters />
        {components.length ? (
          <>
            <div className=" grid grid-cols-3 mt-5  gap-8 max-lg:grid-cols-2 max-sm:grid-cols-1">
              {components.map((item, index) => (
                <ComponentCard key={index} {...item} />
              ))}
            </div>
            <Pagination totalPages={totalPages} />
          </>
        ) : (
          <article className="mt-[10px] overflow-hidden rounded-xl border-2 border-solid border-gray-700">
            <div className="flex h-full flex-col items-center justify-center px-24 py-12 text-center">
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
