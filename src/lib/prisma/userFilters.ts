
type SearchParams = {
  page?: number;
  sortBy?: string;
  query?: string;
  // status?: ;
};
type Filters = {
  searchParams: SearchParams;
};

export const userFilters = ({ searchParams }: Filters) => {
  const sortBy = searchParams.sortBy ?? "latest";
  const query = searchParams.query ?? "";

  let sort = {};
  if (sortBy === "latest") {
    sort = { createdAt: "desc" };
  } else if (sortBy === "name") {
    sort = { name: "desc" };
  } else if (sortBy === "username") {
    sort = { username: "desc" };
  }

  return {
    where: {
      AND: [
        {
          OR: [
            {
              name: {
                contains: query,
              },
              username: {
                contains: query,
              },
            },
          ],
        },
      ],
    },
    orderBy: sort,
  };
};
