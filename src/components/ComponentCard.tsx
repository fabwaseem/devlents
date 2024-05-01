"use client";
import React from "react";
import parse from "html-react-parser";
import Link from "next/link";
import ReactShadowRoot from "react-shadow-root";
import { formatNumber } from "@/lib/utils";
import { CodeIcon, Eye, ThumbsUp } from "lucide-react";
import { ComponentData } from "@/types";
import { Session } from "next-auth";
import { usePathname } from "next/navigation";

const ComponentCard = ({
  component,
  session,
}: {
  component: ComponentData;
  session: Session | null;
}) => {
  const pathname = usePathname();
  const isOwner = session?.user?.id === component.user.id;
  const isFavourite = component.favourites.length > 0;
  const isUpvoted = component.upvotes.length > 0;

  return (
    <div className="flex flex-col">
      <div className="group relative max-h-[500px] min-h-[300px] grow overflow-hidden rounded-xl bg-gray-50 dark:bg-dark-200">
        <div className="relative z-[1] flex h-full w-full  animate-fade-in items-center  justify-center bg-gray py-20 shadow-nav dark:bg-dark-200">
          <ReactShadowRoot>
            <style>{component.css}</style>
            {parse(component.html + "")}
          </ReactShadowRoot>
        </div>
        <Link
          className="absolute bottom-3 right-3 z-10 flex items-center gap-2 rounded-lg bg-white px-2 py-1 font-sans font-semibold opacity-0 transition-opacity group-hover:opacity-100 dark:bg-dark-300"
          href={`/component/${component.slug}`}
        >
          <CodeIcon size={16} />
          Get code
        </Link>
      </div>

      <div className="mt-1 flex h-[28px] items-center justify-between gap-5 px-2">
        {pathname.includes("/profile") ? (
          ""
        ) : (
          <Link
            href={`/profile/${component.user.username}`}
            className="overflow-hidden overflow-ellipsis whitespace-nowrap text-sm font-semibold "
          >
            {component.user.username}
          </Link>
        )}
        <div className="flex items-center gap-3 whitespace-nowrap text-gray-500 ml-auto">
          <span className="flex items-center gap-2">
            {formatNumber(component.views)} <Eye size={16} />
          </span>
          <span className="flex items-center gap-2">
            {formatNumber(component._count.upvotes)} <ThumbsUp size={16} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default ComponentCard;
