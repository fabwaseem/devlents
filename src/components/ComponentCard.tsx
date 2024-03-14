import Image from "next/image";
import React from "react";
import { Avatar, AvatarFallback } from "./ui/Avatar";

const ComponentCard = () => {
  return (
    <div>
      <div className="relative h-[300px] shadow-nav ">
        <Image
          src={"/images/comp.jpg"}
          alt="comp"
          fill
          className="rounded-md object-cover"
        />
      </div>
      <div className="mt-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarFallback>JS</AvatarFallback>
          </Avatar>
          <div>
            <h6 className="">Component Name</h6>
            <p className="text-xs">John Doe</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComponentCard;
