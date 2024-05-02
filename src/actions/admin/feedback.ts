"use server";
import { db } from "@/server/db";

export const deleteFeedback = async (id: string) => {
  await db.feedback.delete({
    where: {
      id,
    },
  });

  return { type: "success", message: "Feedback deleted successfully" };
};


export const updateFeedback = async (id: string, data: any) => {
  await db.feedback.update({
    where: {
      id,
    },
    data,
  });

  return { type: "success", message: "Feedback updated successfully" };
}