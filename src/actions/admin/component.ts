"use server";
import { db } from "@/server/db";

export const deleteComponent = async (id: string) => {
  await db.component.delete({
    where: {
      id,
    },
  });

  return { type: "success", message: "Component deleted successfully" };
};


export const updateComponent = async (id: string, data: any) => {
  await db.component.update({
    where: {
      id,
    },
    data,
  });

  return { type: "success", message: "Component updated successfully" };
}