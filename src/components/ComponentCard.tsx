"use client";
import React from "react";
import parse from "html-react-parser";
import type { Component, User, Category } from "@prisma/client";
import Link from "next/link";
import ReactShadowRoot from "react-shadow-root";
import { formatNumber } from "@/lib/utils";
import { CodeIcon, Eye, ThumbsUp } from "lucide-react";

// add user type in the component
type ComponentCardProps = Component & {
  user: User;
  category: Category;
};

const ComponentCard = (component: ComponentCardProps) => {

  return (
    <div>
      <div className="group relative overflow-hidden rounded-xl bg-gray-50 dark:bg-dark-200">
        <div className="relative z-[1] flex h-[300px] w-full  animate-fade-in items-center  justify-center bg-gray shadow-nav dark:bg-dark-200">
          <ReactShadowRoot>
            <style>{component.css}</style>
            {parse(component.html + "")}
          </ReactShadowRoot>
        </div>
        <Link
          className="absolute bottom-3 right-3 z-10 flex items-center gap-2 rounded-lg bg-white px-2 py-1 font-sans font-semibold opacity-0 transition-opacity group-hover:opacity-100 dark:bg-dark-300"
          href={`/components/${component.slug}`}
        >
          <CodeIcon size={16} />
          Get code
        </Link>
      </div>

      <div className="mt-1 flex h-[28px] items-center justify-between gap-5 px-2">
        <Link
          href={`/profile/${component.user.username}`}
          className="overflow-hidden overflow-ellipsis whitespace-nowrap"
        >
          {component.user.username}
        </Link>
        <div className="flex items-center gap-3 whitespace-nowrap text-gray-500">
          <span className="flex items-center gap-2">
            {formatNumber(component.views)} <Eye size={16} />
          </span>
          <span className="flex items-center gap-2">
            {formatNumber(component.upvotes)} <ThumbsUp size={16} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default ComponentCard;
