"use server";
import { lentsOnComponentPublish } from "@/lib/admin-config";
import { db } from "@/server/db";
import { type ComponentStatus } from "@prisma/client";

export const deleteComponent = async (id: string) => {
  await db.component.delete({
    where: {
      id,
    },
  });

  return { type: "success", message: "Component deleted successfully" };
};

interface UpdateComponentData {
  status?: ComponentStatus;
}

export const updateComponent = async (
  id: string,
  data: UpdateComponentData,
) => {
  const existingComponent = await db.component.findUnique({
    where: {
      id,
    },
  });

  if (!existingComponent) {
    return { type: "error", message: "Component not exists" };
  }

  const component = await db.component.update({
    where: {
      id,
    },
    data,
    include: {
      user: {
        select: {
          id: true,
        },
      },
    },
  });

  const status = data.status as ComponentStatus | undefined;

  if (status !== existingComponent.status) {
    if (status === "PUBLISHED") {
      await db.lent.create({
        data: {
          lents: lentsOnComponentPublish,
          userId: component.user.id,
          componentId: id,
          activity: "COMPONENT_CREATED",
        },
      });

      await db.notification.create({
        data: {
          userId: component.user.id,
          message: ``,
          type: "COMPONENT_APPROVED",
        },
      });
    }

    if (status === "REJECTED") {
      await db.notification.create({
        data: {
          userId: component.user.id,
          message: ``,
          type: "COMPONENT_REJECTED",
        },
      });
    }
  }

  return { type: "success", message: "Component updated successfully" };
};
