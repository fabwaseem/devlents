import { Role } from "@prisma/client";
import {
  Component,
  LayoutDashboard,
  LucideIcon,
  Rss,
  User,
  Users,
} from "lucide-react";

interface SidebarLink {
  label: string;
  path: string;
  icon: LucideIcon;
  submenu?: SidebarLink[];
}

export const sidebarLinks: SidebarLink[] = [
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

export const lentsOnComponentPublish = 50;
export const lentsOnComponentUpvote = 10;
export const lentsOnComponentFavourite = 20;
