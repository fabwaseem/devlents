import { type ComponentType, type ComponentStatus } from "@prisma/client";

type SearchParams = {
  page?: number;
  category?: string;
  sortBy?: string;
  query?: string;
};
type ComponentFilters =
  | {
      searchParams: SearchParams;
      type: "components";
      status: ComponentStatus;
      userId?: string;
      compType?: string;
    }
  | {
      searchParams: SearchParams;
      type: "componentstypes";
      compType: "favourites" | "css" | "tailwind";
      status: ComponentStatus;
      userId?: string;
    }
  | {
      searchParams: SearchParams;
      type: "profile";
      status: ComponentStatus;
      userId: string;
      compType?: string;
    };

export const componentFilters = ({
  searchParams,
  type,
  status,
  userId,
  compType,
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

  return {
    where: {
      AND: [
        ...uncommonFilters,
        {
          status,
        },
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
