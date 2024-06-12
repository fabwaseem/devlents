
type SearchParams = {
  sortBy?: string;
  query?: string;
  // status?: ;
};
type Filters = {
  searchParams: SearchParams;
};

export const feedbackFilters = ({ searchParams }: Filters) => {
  const sortBy = searchParams.sortBy ?? "latest";
  const query = searchParams.query ?? "";

  let sort = {};
  if (sortBy === "latest") {
    sort = { createdAt: "desc" };
  } else if (sortBy === "title") {
    sort = { title: "desc" };
  } else if (sortBy === "type") {
    sort = { type: "desc" };
  }

  return {
    where: {
      AND: [
        {
          OR: [
            {
              title: {
                contains: query,
              },
              description: {
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
