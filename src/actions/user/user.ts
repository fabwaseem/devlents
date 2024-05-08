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
