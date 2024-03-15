import { LucideIcon } from "lucide-react";

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