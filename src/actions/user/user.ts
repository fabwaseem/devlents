"use server";

import { db } from "@/server/db";

export const getUserLents = async (userId: string) => {
  const lents = await db.lent.findMany({
    where: {
      userId,
    },
  });

  const totalLents = lents.reduce((acc, lent) => {
    return acc + lent.lents;
  }, 0);

  return totalLents;
};

export const geUserUnreadNotifications = async (userId: string) => {
  const notifications = await db.notification.findMany({
    where: {
      userId,
      read: false,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return notifications;
};

export const markAllNotificationsAsRead = async (userId: string) => {
  await db.notification.updateMany({
    where: {
      userId,
    },
    data: {
      read: true,
    },
  });

  return { type: "success", message: "" };
};

export const markNotificationAsRead = async (id: string) => {
  await db.notification.update({
    where: {
      id,
    },
    data: {
      read: true,
    },
  });

  return { type: "success", message: "" };
};
