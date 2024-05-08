"use server";
import { db } from "@/server/db";

export const getNewActivities = async () => {
  const activities = await db.activity.findMany({
    where: {
      read: false,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: {
        select: {
          username: true,
        },
      },
      component: {
        select: {
          category: {
            select: {
              title: true,
            },
          },
          slug: true,
        },
      },
    },
  });

  return activities;
};

export const markRead = async (id: string) => {
  await db.activity.update({
    where: {
      id,
    },
    data: {
      read: true,
    },
  });
};
