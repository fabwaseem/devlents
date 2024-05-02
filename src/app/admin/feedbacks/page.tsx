import Breadcrumb from "@/components/admin/Breadcrumb";
import { db } from "@/server/db";
import React from "react";
import { feedbackFilters } from "@/lib/prisma/feedbackFilters";
import { tableDataPerPage } from "@/lib/admin-config";

import DataRow from "./_dataRow";
import TablePagination from "@/components/admin/TablePagination";
import Filters from "@/app/(root)/components/_filters";
import SearchForm from "@/app/(root)/SearchForm";
import { getServerAuthSession } from "@/server/auth";
import { count } from "console";

interface Props {
  searchParams: {
    page?: number;
    type?: string;
    sortBy?: string;
    query?: string;
  };
}

const page = async ({ searchParams }: Props) => {
  const page = searchParams.page ?? 1;

  const [count, feedbacks] = await db.$transaction([
    db.feedback.count({
      ...feedbackFilters({
        searchParams,
      }),
    }),
    db.feedback.findMany({
      take: tableDataPerPage,
      skip: tableDataPerPage * (page - 1),
      ...feedbackFilters({
        searchParams,
      }),
      include: {
        user: {
          select: {
            name: true,
            username: true,
          },
        },
      },
    }),
  ]);

  const totalPages = Math.ceil(count / tableDataPerPage);

  return (
    <>
      <Breadcrumb pageName="Users" />
      <div className="flex flex-col items-center justify-between lg:flex-row">
        <Filters />
        <div className="w-full max-w-[320px]">
          <SearchForm type="COMPONENTS" />
        </div>
      </div>
      {feedbacks.length > 0 ? (
        <>
          <div className="mt-5 rounded-xl border border-borderColour bg-gray px-5 pb-2.5 pt-6 shadow-default dark:border-borderColour-dark dark:bg-dark sm:px-7 xl:pb-1">
            <div className="max-w-full overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-200 text-left dark:bg-dark-200">
                    <th className="min-w-[220px] px-4 py-4 font-medium  xl:pl-11">
                      Name
                    </th>
                    <th className="min-w-[220px] px-4 py-4 font-medium  xl:pl-11">
                      Title
                    </th>
                    <th className="min-w-[150px] px-4 py-4 font-medium ">
                      Created At
                    </th>
                    <th className="min-w-[120px] px-4 py-4 font-medium ">
                      Status
                    </th>
                    <th className="px-4 py-4 font-medium ">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {feedbacks.map((item, key) => (
                    <DataRow key={key} feedback={item}  />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <TablePagination page={page} totalPages={totalPages} />
        </>
      ) : (
        <div className="flex h-[300px] items-center justify-center">
          <p className="text-center text-paragraph">No Users found</p>
        </div>
      )}
    </>
  );
};

export default page;
