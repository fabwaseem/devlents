"use client";
import { formUrlQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icons } from "@/components/Icons";
import {
  Bookmark,
  Calendar,
  Eye,
  Filter,
  Layers3,
  ThumbsUp,
} from "lucide-react";
import { componentCategories } from "@/lib/config";

const Filters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sortBy = searchParams.get("sortBy") ?? "latest";
  const category = searchParams.get("category") ?? "all";

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

  const sortItems = [
    {
      icon: Calendar,
      value: "latest",
    },
    {
      icon: Bookmark,
      value: "favourites",
    },
    {
      icon: Eye,
      value: "views",
    },
    {
      icon: ThumbsUp,
      value: "upvotes",
    },
  ];

  return (
    <div className="flex w-full items-center gap-2 max-lg:justify-between">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild className="group">
          <span
            className={`flex cursor-pointer items-center gap-2 rounded-xl border border-transparent px-5 py-[5px] font-sans  text-base font-medium capitalize leading-8 text-paragraph transition-colors duration-500 hover:border-borderColour hover:bg-white hover:duration-500 data-[state=open]:border-primary  dark:text-white dark:hover:bg-dark-200 lg:px-4 xl:px-5`}
          >
            <Filter size={20} /> <span className="max-md:hidden">Sort :</span>{" "}
            {sortBy}
            <Icons.chevronDown
              size={16}
              className="arrow ml-1 mt-1 text-paragraph duration-500 group-data-[state=open]:rotate-180 dark:text-white"
            />
          </span>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          {sortItems.map((item, index) => (
            <DropdownMenuItem
              key={index}
              className={`gap-2 ${sortBy === item.value ? "before:scale-x-100" : ""}`}
              onClick={() => handleSort({ key: "sortBy", value: item.value })}
            >
              <item.icon size={16} />
              {item.value}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild className="group">
          <span
            className={`flex cursor-pointer items-center gap-2 rounded-xl border border-transparent px-5 py-[5px] font-sans  text-base font-medium capitalize leading-8 text-paragraph transition-colors duration-500 hover:border-borderColour hover:bg-white hover:duration-500 data-[state=open]:border-primary  dark:text-white dark:hover:bg-dark-200 lg:px-4 xl:px-5`}
          >
            <Layers3 size={20} />{" "}
            <span className="max-md:hidden">Category :</span>
            {category}
            <Icons.chevronDown
              size={16}
              className="arrow ml-1 mt-1 text-paragraph duration-500 group-data-[state=open]:rotate-180 dark:text-white"
            />
          </span>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuItem
            className={`gap-2 ${category === "all" ? "before:scale-x-100" : ""}`}
            onClick={() => handleSort({ keysToRemove: ["category"] })}
          >
            all
          </DropdownMenuItem>
          {componentCategories.map((item, index) => (
            <DropdownMenuItem
              key={index}
              className={`gap-2 ${category === item.value ? "before:scale-x-100" : ""}`}
              onClick={() => handleSort({ key: "category", value: item.value })}
            >
              {item.value}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Filters;
