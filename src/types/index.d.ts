import { Component, ComponentStatus, Feedback } from "@prisma/client";
import { type LucideIcon } from "lucide-react";

export type SidebarNavItem = {
  title: string;
  href?: string;
  icon: LucideIcon;
  submenu?: SidebarSubMenuLink[];
};

type SidebarSubMenuLink = {
  title: string;
  href: string;
};

export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    twitter: string;
    github: string;
  };
};

export type ApiResponse = {
  msg: string;
};

type ComponentData = Component & {
  status: ComponentStatus;
  user: {
    id: string;
    username: string?;
  };
  category: {
    id: string;
    title: string;
  };
  upvotes: { id: string }[];
  favourites: { id: string }[];
  _count: {
    upvotes: number;
    favourites: number;
  };
};

type FeedbackData = Feedback & {
  user: {
    username: string?;
    name: string;
  };
};

type FormMsgProps = {
  type: "error" | "success" | "info" | "warning";
  message?: string;
};