"use server";

import {
  lentsOnComponentFavourite,
  lentsOnComponentUpvote,
} from "@/lib/admin-config";
import { getServerUser } from "@/server/auth";
import { db } from "@/server/db";

export const addUpvote = async (id: string) => {
  const user = await getServerUser();
  if (!user) {
    return { type: "error", message: "Login now to upvote" };
  }
  const component = await db.component.update({
    where: { id },
    data: {
      upvotes: {
        connect: {
          id: user.id,
        },
      },
    },
    include: {
      user: {
        select: {
          id: true,
        },
      },
    },
  });

  await db.lent.create({
    data: {
      lents: lentsOnComponentUpvote,
      userId: component.user.id,
      componentId: id,
      activity: "UPVOTE",
    },
  });

  return { type: "success", message: "Added" };
};

export const removeUpvote = async (id: string) => {
  const user = await getServerUser();
  if (!user) {
    return { type: "error", message: "Login now to upvote" };
  }
  const component = await db.component.update({
    where: { id },
    data: {
      upvotes: {
        disconnect: {
          id: user.id,
        },
      },
    },
    include: {
      user: {
        select: {
          id: true,
        },
      },
    },
  });

  const lents = await db.lent.findFirst({
    where: {
      userId: component.user.id,
      componentId: id,
      activity: "UPVOTE",
    },
  });

  if (lents) {
    await db.lent.delete({
      where: {
        id: lents.id,
      },
    });
  }

  return { type: "success", message: "Removed" };
};

export const addFavorite = async (id: string) => {
  const user = await getServerUser();
  if (!user) {
    return { type: "error", message: "Login now to favorite" };
  }
  const component = await db.component.update({
    where: { id },
    data: {
      favourites: {
        connect: {
          id: user.id,
        },
      },
    },
    include: {
      user: {
        select: {
          id: true,
        },
      },
    },
  });

  await db.lent.create({
    data: {
      lents: lentsOnComponentFavourite,
      userId: component.user.id,
      componentId: id,
      activity: "FAVOURITE",
    },
  });

  return { type: "success", message: "Added" };
};

export const removeFavorite = async (id: string) => {
  const user = await getServerUser();
  if (!user) {
    return { type: "error", message: "Login now to favorite" };
  }
  const component = await db.component.update({
    where: { id },
    data: {
      favourites: {
        disconnect: {
          id: user.id,
        },
      },
    },
    include: {
      user: {
        select: {
          id: true,
        },
      },
    },
  });

  const lents = await db.lent.findFirst({
    where: {
      userId: component.user.id,
      componentId: id,
      activity: "FAVOURITE",
    },
  });

  if (lents) {
    await db.lent.delete({
      where: {
        id: lents.id,
      },
    });
  }

  return { type: "success", message: "Removed" };
};

export const deleteComponent = async (id: string) => {
  const user = await getServerUser();
  if (!user) {
    return { type: "error", message: "Unauthorized" };
  }
  await db.component.delete({
    where: {
      id,
    },
  });
  return { type: "success", message: "Component deleted successfully" };
};

export const addView = async (id: string) => {
  await db.component.update({
    where: { id },
    data: {
      views: {
        increment: 1,
      },
    },
  });

  return { type: "success", message: "Added" };
};
