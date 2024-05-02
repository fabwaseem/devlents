import { Role } from "@prisma/client";
import { Component, LayoutDashboard, Rss, User, Users } from "lucide-react";

export const sidebarLinks = [
  {
    label: "Dashboard",
    path: "",
    icon: LayoutDashboard,
  },
  {
    label: "Components",
    icon: Component,
    path: "/components",
  },
  {
    label: "Feedbacks",
    icon: Rss,
    path: "/feedbacks",
  },
  {
    label: "Users",
    icon: Users,
    path: "/users",
  },
];

export const tableDataPerPage = 6;
export const adminRoles: Role[] = ["MANAGER", "ADMIN", "SUPERADMIN"];

export const rolesCanUpdateUser: Role[] = ["MANAGER", "ADMIN", "SUPERADMIN"];
export const rolesCanUpdateManager: Role[] = ["ADMIN", "SUPERADMIN"];
export const rolesCanUpdateAdmin: Role[] = ["SUPERADMIN"];
export const minRequiredSuperAdmins = 1;

export const rolesCanChangeRole: Role[] = ["ADMIN", "SUPERADMIN"];
export const adminCanChangeRoleUpto: Role[] = ["USER", "MANAGER"];
