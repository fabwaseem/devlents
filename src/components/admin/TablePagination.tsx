"use client";
import React, { useState } from "react";
import { Button } from "../ui/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { formUrlQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import page from "@/app/(root)/page";

interface Props {
  page: number;
  totalPages: number;
}

const TablePagination: React.FC<Props> = ({ page, totalPages }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(page); // Maintain current page state

  const handlePrevClick = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      handleSort({
        key: "page",
        value: newPage.toString(),
      });
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      handleSort({
        key: "page",
        value: newPage.toString(),
      });
    }
  };

  const handleClick = (page: number) => {
    setCurrentPage(page);
    handleSort({
      key: "page",
      value: page.toString(),
    });
  };

  // Calculate the range of pages to display, considering edge cases
  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, currentPage + 2);
  const pageRange = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i,
  );

  const handleSort = ({
    key,
    value,
    keysToRemove,
  }: {
    key?: string;
    value?: string;
    keysToRemove?: string[];
  }) => {
    let newUrl = "";
    newUrl = formUrlQuery({
      params: searchParams.toString(),
      key,
      value,
      keysToRemove,
    });
    router.push(newUrl);
  };

  return (
    <div className="mt-5 flex justify-end gap-2">
      <Button
        size={"icon"}
        variant={"outline"}
        onClick={handlePrevClick}
        disabled={currentPage === 1} // Disable prev button on first page
      >
        <ChevronLeft size={16} />
      </Button>
      {pageRange.map((pageNumber) => (
        <Button
          size={"icon"}
          variant={"outline"}
          key={pageNumber}
          disabled={pageNumber === currentPage}
          onClick={() => handleClick(pageNumber)}
        >
          {pageNumber}
        </Button>
      ))}
      <Button
        variant={"outline"}
        size={"icon"}
        onClick={handleNextClick}
        disabled={currentPage === totalPages} // Disable next button on last page
      >
        <ChevronRight size={16} />
      </Button>
    </div>
  );
};

export default TablePagination;
