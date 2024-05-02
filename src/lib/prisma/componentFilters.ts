import { type ComponentType, type ComponentStatus } from "@prisma/client";
import { Session } from "next-auth";
import { adminRoles } from "../admin-config";

type SearchParams = {
  page?: number;
  category?: string;
  sortBy?: string;
  query?: string;
  status?: ComponentStatus;
};
type ComponentFilters =
  | {
      searchParams: SearchParams;
      type: "components";
      status: ComponentStatus;
      userId?: string;
      session?: Session | null;
      compType?: string;
    }
  | {
      searchParams: SearchParams;
      type: "componentstypes";
      compType: "favourites" | "css" | "tailwind";
      status: ComponentStatus;
      session?: Session | null;
      userId?: string;
    }
  | {
      searchParams: SearchParams;
      type: "profile";
      status: ComponentStatus;
      userId: string;
      session?: Session | null;
      compType?: string;
    }
  | {
      searchParams: SearchParams;
      type: "admin";
      status?: ComponentStatus;
      userId?: string;
      compType?: string;
      session?: Session | null;
    };

export const componentFilters = ({
  searchParams,
  type,
  status,
  userId,
  compType,
  session,
}: ComponentFilters) => {
  const sortBy = searchParams.sortBy ?? "latest";
  const query = searchParams.query ?? "";

  let sort = {};
  if (sortBy === "latest") {
    sort = { createdAt: "desc" };
  } else if (sortBy === "favourites") {
    sort = {
      favourites: {
        _count: "desc",
      },
    };
  } else if (sortBy === "views") {
    sort = { views: "desc" };
  } else if (sortBy === "upvotes") {
    sort = {
      upvotes: {
        _count: "desc",
      },
    };
  } else if (sortBy === "status") {
    sort = {
      status: "desc",
    };
  }

  const uncommonFilters = [];

  if (type === "profile") {
    uncommonFilters.push({
      userId,
    });
  }

  if (type === "componentstypes") {
    const favourites =
      compType === "favourites"
        ? {
            some: {
              id: userId,
            },
          }
        : {};

    const filterType = compType !== "favourites" ? compType?.toUpperCase() : {};

    uncommonFilters.push({
      favourites,
    });

    uncommonFilters.push({
      type: filterType as ComponentType,
    });
  }

  session?.user &&
  adminRoles.includes(session?.user.role) &&
  searchParams.status
    ? uncommonFilters.push({ status: searchParams.status })
    : uncommonFilters.push({ status });

  return {
    where: {
      AND: [
        ...uncommonFilters,
        {
          category: { slug: searchParams.category },
        },
        {
          OR: [
            {
              category: {
                title: {
                  contains: query,
                },
              },
            },
            {
              tags: {
                some: {
                  title: {
                    contains: query,
                  },
                },
              },
            },
            {
              user: {
                OR: [
                  {
                    username: {
                      contains: query,
                    },
                  },
                  {
                    name: {
                      contains: query,
                    },
                  },
                ],
              },
            },
          ],
        },
      ],
    },
    orderBy: sort,
  };
};
