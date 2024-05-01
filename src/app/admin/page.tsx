import CardDataStats from "@/components/admin/CardDataStats";
import { Component, Eye } from "lucide-react";
import React from "react";

const page = () => {
  return (
    <>
      <div className="2xl:gap-7 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4">
        <CardDataStats title="Total compoents" total="3K" rate="0.43%" levelUp>
          <Component size={16} className="text-primary " />
        </CardDataStats>
      </div>
    </>
  );
};

export default page;
