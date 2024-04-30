"use client";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { formUrlQuery } from "@/lib/utils";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { type } from "os";
import React, { useState } from "react";

const SearchForm = ({
  type = "LANDING",
}: {
  type?: "LANDING" | "COMPONENTS";
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [query, setQuery] = useState<string>("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let newUrl = "";
    newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "query",
      value: query,
    });
    newUrl = type === "LANDING" && newUrl ? `/components?${newUrl}` : newUrl;
    router.push(newUrl);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      {type === "LANDING" ? (
        <div className="grid w-full max-w-[520px] grid-cols-12 items-center rounded-xl border border-borderColour bg-white pb-1 pe-1 pl-4 pt-1 dark:border-[#31332F] dark:bg-dark-200 sm:pl-5">
          <input
            type="text"
            placeholder="Search for components"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="col-span-8 bg-transparent leading-[1.75] text-[#A1A49D] outline-none transition-all duration-300 focus:outline-none dark:placeholder:text-[#A1A49D] "
          />
          <Button
            className="col-span-4 max-lg:!px-3 max-lg:!text-sm "
            type="submit"
          >
            Search
          </Button>
        </div>
      ) : (
        <div className="relative w-full max-lg:mt-2 ">
          <Input
            type="text"
            placeholder="Search for components"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 "
          />
          <button
            type="submit"
            className="absolute left-4 top-1/2 -translate-y-1/2"
          >
            <Search size={16} />
          </button>
        </div>
      )}
    </form>
  );
};

export default SearchForm;
