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

type Component = {
  slug: string;
  html?: string | null;
  css?: string | null;
  javascript?: string | null;
  thumbnail?: string | null;
  user: User;
};

type User = {
  name: string | null;
  email: string | null;
  image: string | null;
};
