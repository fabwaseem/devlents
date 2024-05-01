import { Component, LayoutDashboard } from "lucide-react";

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
    submenu: [
      {
        label: "Review",
        path: "/components/review",
      },
    ],
  },
];
