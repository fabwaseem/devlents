export const includeComponent = (userId?: string | undefined) => {
  return {
    user: {
      select: {
        id: true,
        username: true,
      },
    },
    category: {
      select: {
        id: true,
        title: true,
      },
    },
    upvotes: {
      where: {
        id: userId,
      },
      select: {
        id: true,
      },
    },
    favourites: {
      where: {
        id: userId,
      },
      select: {
        id: true,
      },
    },
    _count: {
      select: {
        upvotes: true,
        favourites: true,
      },
    },
  };
};
