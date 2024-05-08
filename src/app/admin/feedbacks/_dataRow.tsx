"use client";
import { deleteFeedback, updateFeedback } from "@/actions/admin/feedback";
import { Button } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { feedbackStatues } from "@/lib/config";
import {type FeedbackData } from "@/types";
import type {  FeedbackStatus } from "@prisma/client";
import { Eye, Trash } from "lucide-react";
import Link from "next/link";
import React, { useTransition } from "react";
import { toast } from "react-toastify";

const DataRow = ({
  feedback,
}: {
  feedback: FeedbackData;
}) => {
  const [isPending, startTransition] = useTransition();

  const handleDelete = async () => {

    startTransition(async() => {
     await deleteFeedback(feedback.id).then((data) => {
        data.type === "success"
          ? toast.success(data.message)
          : toast.error(data.message);
      });
    });
  };

  const handleUpdateStatus = async (status: FeedbackStatus) => {
    startTransition(async() => {
     await updateFeedback(feedback.id, { status }).then((data) => {
        data.type === "success"
          ? toast.success(data.message)
          : toast.error(data.message);
      });
    });
  };

  return (
    <tr>
      <td className="border-b border-borderColour px-4 py-5 pl-9 dark:border-borderColour-dark xl:pl-11">
        <h5 className="font-medium capitalize">{feedback.user.name}</h5>
        <Link
          href={`/profile/${feedback.user.username}`}
          target="_blank"
          className="text-sm"
        >
          {feedback.user.username}
        </Link>
      </td>
      <td className="border-b border-borderColour px-4 py-5 dark:border-borderColour-dark">
        <p className="text-sm">{feedback.title}</p>
      </td>
      <td className="border-b border-borderColour px-4 py-5 dark:border-borderColour-dark">
        <p className="href href">
          {new Date(feedback.createdAt).toLocaleDateString("en-US")}
        </p>
      </td>
      <td className="border-b border-borderColour px-4 py-5 dark:border-borderColour-dark">
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <p
              className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium ${
                feedback.status === "UNDER_REVIEW"
                  ? "bg-green-500/25 text-green-500"
                  : "bg-red-500/25 text-red-500"
              }`}
            >
              {feedback.status}
            </p>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {feedbackStatues.map((item, index) => (
              <DropdownMenuItem
                key={index}
                onClick={() => handleUpdateStatus(item)}
              >
                {item}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </td>
      <td className="border-b border-borderColour px-4 py-5 dark:border-borderColour-dark">
        <div className="flex items-center space-x-3.5">
          <Button size="icon" variant="icon" asChild>
            <Link href={`/profile/${feedback.id}`} target="_blank">
              <Eye size={16} />
            </Link>
          </Button>
          <Button
            size="icon"
            variant="icon"
            onClick={handleDelete}
            disabled={isPending}
          >
            <Trash size={16} />
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default DataRow;
