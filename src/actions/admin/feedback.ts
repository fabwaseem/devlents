"use server";
import { db } from "@/server/db";
import { FeedbackStatus } from "@prisma/client";

export const deleteFeedback = async (id: string) => {
  await db.feedback.delete({
    where: {
      id,
    },
  });

  return { type: "success", message: "Feedback deleted successfully" };
};

interface UpdateFeedbackData {
  status?: FeedbackStatus;
}

export const updateFeedback = async (id: string, data: UpdateFeedbackData) => {
  await db.feedback.update({
    where: {
      id,
    },
    data,
  });

  return { type: "success", message: "Feedback updated successfully" };
};