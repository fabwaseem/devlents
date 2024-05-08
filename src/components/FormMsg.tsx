import { cn } from "@/lib/utils";
import { FormMsgProps } from "@/types";
import { CircleAlert, CircleCheck, CircleMinus, CircleX } from "lucide-react";
import React from "react";

const FormMsg = ({ type = "success", message }: FormMsgProps) => {
  return (
    <div
      className={cn("flex items-center gap-x-2 rounded-md p-3  ", {
        "bg-red-500/15 text-red-500": type === "error",
        "bg-green-500/15 text-green-500": type === "success",
        "bg-blue-500/15 text-blue-500": type === "info",
        "bg-yellow-500/15 text-yellow-500": type === "warning",
      })}
    >
      <span>
        {type === "error" && <CircleX size={20} />}
        {type === "success" && <CircleCheck size={20} />}
        {type === "info" && <CircleMinus size={20} />}
        {type === "warning" && <CircleAlert size={20} />}
      </span>
      <span>{message}</span>
    </div>
  );
};

export default FormMsg;
