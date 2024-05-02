"use server";

import {
  adminCanChangeRoleUpto,
  minRequiredSuperAdmins,
  rolesCanChangeRole,
  rolesCanUpdateAdmin,
  rolesCanUpdateManager,
  rolesCanUpdateUser,
} from "@/lib/admin-config";
import { getServerUser } from "@/server/auth";
import { db } from "@/server/db";

export const deleteUser = async (id: string) => {
  const user = await db.user.findUnique({
    where: {
      id,
    },
  });

  if (!user) {
    return { type: "error", message: "User not found" };
  }

  const currentUser = await getServerUser();

  if (!currentUser) {
    return { type: "error", message: "Unauthorized" };
  }

  

  if (user.role === "USER" && !rolesCanUpdateUser.includes(currentUser.role)) {
    return {
      type: "error",
      message: "You are not authorized to delete this user",
    };
  }

  if (
    user.role === "MANAGER" &&
    !rolesCanUpdateManager.includes(currentUser.role)
  ) {
    return {
      type: "error",
      message: "You are not authorized to delete this user",
    };
  }

  if (
    user.role === "ADMIN" &&
    !rolesCanUpdateAdmin.includes(currentUser.role)
  ) {
    return {
      type: "error",
      message: "You are not authorized to delete this user",
    };
  }

  if (user.role === "SUPERADMIN" && currentUser.id !== user.id) {
    return {
      type: "error",
      message: "You cannot delete other superadmins",
    };
  }

  if (user.role === "SUPERADMIN" && currentUser.id === user.id) {
    const superAdmins = await db.user.count({
      where: {
        role: "SUPERADMIN",
      },
    });

    if (superAdmins <= minRequiredSuperAdmins) {
      return {
        type: "error",
        message: "You can't delete the last superadmin",
      };
    }
  }

  await db.user.delete({
    where: {
      id,
    },
  });

  return { type: "success", message: "User deleted successfully" };
};

export const updateUser = async (id: string, data: any) => {
  const user = await db.user.findUnique({ where: { id } });
  if (!user) return { type: "error", message: "User not found" };

  const currentUser = await getServerUser();
  if (!currentUser) return { type: "error", message: "Unauthorized" };

  const checkPermission = (message: string) => {
    return { type: "error", message };
  };

  const canUpdateRole = rolesCanChangeRole.includes(currentUser.role);
  const canUpdateUser = rolesCanUpdateUser.includes(currentUser.role);
  const canUpdateManager = rolesCanUpdateManager.includes(currentUser.role);
  const canUpdateAdmin = rolesCanUpdateAdmin.includes(currentUser.role);

  if (data.role) {
    if (!canUpdateRole)
      return checkPermission("You are not authorized to change roles");
    if (
      !adminCanChangeRoleUpto.includes(data.role) &&
      currentUser.role !== "SUPERADMIN"
    ) {
      return checkPermission(
        "You are not authorized to change roles to this role",
      );
    }
  }

  if (user.role === "USER" && !canUpdateUser) {
    return checkPermission("You are not authorized to update this user");
  }

  if (user.role === "MANAGER" && !canUpdateManager) {
    return checkPermission("You are not authorized to update this user");
  }

  if (user.role === "ADMIN" && !canUpdateAdmin) {
    return checkPermission("You are not authorized to update this user");
  }

  if (user.role === "SUPERADMIN") {
    if (currentUser.id !== user.id) {
      return checkPermission("You cannot update other superadmins");
    }

    if (data.role !== "SUPERADMIN") {
      const superAdmins = await db.user.count({
        where: { role: "SUPERADMIN" },
      });
      if (superAdmins <= minRequiredSuperAdmins) {
        return checkPermission(
          "You can't update the role of the last superadmin",
        );
      }
    }
  }

  await db.user.update({ where: { id }, data });
  return { type: "success", message: "User updated successfully" };
};
