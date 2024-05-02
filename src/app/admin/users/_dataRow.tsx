"use client";
import { deleteComponent, updateComponent } from "@/actions/admin/component";
import { deleteUser, updateUser } from "@/actions/admin/user";
import { Button } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { userRoles } from "@/lib/config";
import { Role, User } from "@prisma/client";
import { Eye, Trash } from "lucide-react";
import { Session } from "next-auth";
import Link from "next/link";
import React, { useTransition } from "react";
import { toast } from "react-toastify";

const DataRow = ({
  user,
}: {
  user: User;
}) => {
  const [isPending, startTransition] = useTransition();

  const handleDelete = async () => {

    startTransition(() => {
      deleteUser(user.id).then((data) => {
        data.type === "success"
          ? toast.success(data.message)
          : toast.error(data.message);
      });
    });
  };

  const handleUpdateRole = async (role: Role) => {
    startTransition(() => {
      updateUser(user.id, { role }).then((data) => {
        data.type === "success"
          ? toast.success(data.message)
          : toast.error(data.message);
      });
    });
  };

  return (
    <tr>
      <td className="border-b border-borderColour px-4 py-5 pl-9 dark:border-borderColour-dark xl:pl-11">
        <h5 className="font-medium capitalize">{user.name}</h5>
        <Link
          href={`/profile/${user.username}`}
          target="_blank"
          className="text-sm"
        >
          {user.username}
        </Link>
      </td>
      <td className="border-b border-borderColour px-4 py-5 dark:border-borderColour-dark">
        <p className="text-sm">{user.email}</p>
      </td>
      <td className="border-b border-borderColour px-4 py-5 dark:border-borderColour-dark">
        <p className="href href">
          {new Date(user.createdAt).toLocaleDateString("en-US")}
        </p>
      </td>
      <td className="border-b border-borderColour px-4 py-5 dark:border-borderColour-dark">
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <p
              className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium ${
                user.role === "ADMIN"
                  ? "bg-green-500/25 text-green-500"
                  : "bg-red-500/25 text-red-500"
              }`}
            >
              {user.role}
            </p>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {userRoles.map((item, index) => (
              <DropdownMenuItem
                key={index}
                onClick={() => handleUpdateRole(item)}
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
            <Link href={`/profile/${user.username}`} target="_blank">
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
