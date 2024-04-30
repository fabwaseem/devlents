import React from "react";
import { Skeleton } from "../ui/Skeleton";

const PreviewSkeleton = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center rounded-lg">
      <div className="  h-16 w-full justify-between p-2 flex">
        <Skeleton className="h-full w-32" />
        <div className="flex gap-3">
          <Skeleton className="hidden h-full w-32 lg:block" />
          <Skeleton className="hidden h-full w-32 lg:block" />
          <Skeleton className="h-full w-12 lg:w-32" />
        </div>
      </div>
      <Skeleton className="h-full w-full" />
      <Skeleton className="mt-2 h-14 w-full" />
    </div>
  );
};

export default PreviewSkeleton;
