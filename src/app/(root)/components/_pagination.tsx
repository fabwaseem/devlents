"use client";
import { formUrlQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const Pagination = ({ totalPages }: { totalPages: number }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") ?? "1");

  const changePage = ({
    page,
    keysToRemove,
  }: {
    page?: string;
    keysToRemove?: string[];
  }) => {
    let newUrl = "";
    newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "page",
      value: page,
      keysToRemove,
    });
    router.push(newUrl);
  };

  const handleNextPage = () => {
    const nextPage = page + 1;
    changePage({ page: nextPage.toString() });
  };

  const handlePreviousPage = () => {
    const previousPage = page - 1;
    changePage({ page: previousPage.toString() });
  };

  return (
    <div className="mt-5 grid grid-cols-2 gap-3">
      {page > 1 && page <= totalPages && (
        <button
          className="rounded-lg flex items-center justify-start gap-5 bg-dark p-5 text-lg font-semibold"
          onClick={handlePreviousPage}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            className="h-6 w-6"
          >
            <path d="M8.83 6a30.23 30.23 0 0 0-5.62 5.406A.949.949 0 0 0 3 12m5.83 6a30.233 30.233 0 0 1-5.62-5.406A.949.949 0 0 1 3 12m0 0h18" />
          </svg>
          Previous page
        </button>
      )}
      {page < totalPages && (
        <button
          className=" col-start-2 flex items-center justify-end gap-5 rounded-lg bg-dark p-5 text-end text-lg font-semibold"
          onClick={handleNextPage}
        >
          Next page
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            className="h-6 w-6"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          >
            <path d="M15.17 6a30.23 30.23 0 0 1 5.62 5.406c.14.174.21.384.21.594m-5.83 6a30.232 30.232 0 0 0 5.62-5.406A.949.949 0 0 0 21 12m0 0H3" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default Pagination;
