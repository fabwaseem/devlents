"use client";
import { deleteComponent, updateComponent } from "@/actions/admin/component";
import { Button } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { componentStatuses } from "@/lib/config";
import { type ComponentData } from "@/types";
import { type ComponentStatus } from "@prisma/client";
import { Eye, Trash } from "lucide-react";
import Link from "next/link";
import React, { startTransition, useTransition } from "react";
import { toast } from "react-toastify";

const DataRow = ({ component }: { component: ComponentData }) => {
  const [isPending, startTransition] = useTransition();

  const handleDelete = async () => {
    startTransition(async () => {
      await deleteComponent(component.id).then((data) => {
        toast.success(data.message);
      });
    });
  };

  const handleUpdateStatus = async (status: ComponentStatus) => {
    startTransition(async() => {
      await updateComponent(component.id, { status }).then((data) => {
        toast.success(data.message);
      });
    });
  };

  return (
    <tr>
      <td className="border-b border-borderColour px-4 py-5 pl-9 dark:border-borderColour-dark xl:pl-11">
        <h5 className="font-medium capitalize">{component.category.title}</h5>
        <Link
          href={`/component/${component.slug}`}
          target="_blank"
          className="text-sm"
        >
          {component.slug}
        </Link>
      </td>
      <td className="border-b border-borderColour px-4 py-5 dark:border-borderColour-dark">
        <Link
          href={`/profile/${component.user.username}`}
          target="_blank"
          className="text-sm"
        >
          {component.user.username}
        </Link>
      </td>
      <td className="border-b border-borderColour px-4 py-5 dark:border-borderColour-dark">
        <p className="href href">
          {new Date(component.createdAt).toLocaleDateString("en-US")}
        </p>
      </td>
      <td className="border-b border-borderColour px-4 py-5 dark:border-borderColour-dark">
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <p
              className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium ${
                component.status === "PUBLISHED"
                  ? "bg-green-500/25 text-green-500"
                  : component.status === "REVIEW"
                    ? "bg-yellow-500/25 text-yellow-500"
                    : component.status === "REJECTED"
                      ? "bg-red-500/25 text-red-500"
                      : "bg-blue-500/25 text-blue-500"
              }`}
            >
              {component.status}
            </p>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {componentStatuses.map((item, index) => (
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
            <Link href={`/component/${component.slug}`} target="_blank">
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
