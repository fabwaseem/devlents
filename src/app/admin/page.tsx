import CardDataStats from "@/components/admin/CardDataStats";
import { db } from "@/server/db";
import { Component, Users } from "lucide-react";
import React from "react";

const page = async () => {
  // count total db.component and also calculate percentage rate of current weeks added components wheather it is increased or decreased

  const now = new Date();
  const currentWeekStart = now.getDate() - (now.getDay() % 7);
  const currentWeekEnd = currentWeekStart + 6;

  const previousWeekStart = currentWeekStart - 7;
  const previousWeekEnd = previousWeekStart + 6;

  const [
    usersCount,
    previousWeekNewUsersCount,
    currentWeekNewUsersCount,
    componentsCount,
    previousWeekComponentsCount,
    currentWeekComponentsCount,
  ] = await db.$transaction([
    db.user.count(),
    db.component.count({
      where: {
        createdAt: {
          gte: new Date(now.getFullYear(), now.getMonth(), previousWeekStart),
          lte: new Date(now.getFullYear(), now.getMonth(), previousWeekEnd),
        },
      },
    }),
    db.user.count({
      where: {
        createdAt: {
          gte: new Date(now.getFullYear(), now.getMonth(), currentWeekStart),
          lte: new Date(now.getFullYear(), now.getMonth(), currentWeekEnd),
        },
      },
    }),
    db.component.count(),
    db.component.count({
      where: {
        createdAt: {
          gte: new Date(now.getFullYear(), now.getMonth(), previousWeekStart),
          lte: new Date(now.getFullYear(), now.getMonth(), previousWeekEnd),
        },
      },
    }),
    db.component.count({
      where: {
        createdAt: {
          gte: new Date(now.getFullYear(), now.getMonth(), currentWeekStart),
          lte: new Date(now.getFullYear(), now.getMonth(), currentWeekEnd),
        },
      },
    }),
  ]);

  const usersRate =
    previousWeekNewUsersCount === 0
      ? 100
      : ((currentWeekNewUsersCount - previousWeekNewUsersCount) /
          previousWeekNewUsersCount) *
        100;

  const componentsRate =
    previousWeekComponentsCount === 0
      ? 100
      : ((currentWeekComponentsCount - previousWeekComponentsCount) /
          previousWeekComponentsCount) *
        100;

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7">
        <CardDataStats
          title="Total users"
          total={usersCount}
          rate={usersRate ?? 0}
          type={usersRate > 0 ? "up" : "down"}
        >
          <Users  className="text-primary " />
        </CardDataStats>
        <CardDataStats
          title="Total components"
          total={componentsCount}
          rate={componentsRate ?? 0}
          type={componentsRate > 0 ? "up" : "down"}
        >
          <Component className="text-primary " />
        </CardDataStats>
      </div>
    </>
  );
};

export default page;
