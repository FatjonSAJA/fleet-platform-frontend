import type { LucideIcon } from "lucide-react";
import type { PermissionRule } from "@/lib/api/auth/permissions";
import type { FileRoutesByTo } from "@/routeTree.gen";

type RoutePath = keyof FileRoutesByTo;

export type NavMainItem = {
  title: string;
  url: RoutePath;
  icon?: LucideIcon;
  items?: NavMainItem[];
  permissions?: PermissionRule;
};

export type NavSecondaryItem = {
  title: string;
  url: RoutePath;
  icon: LucideIcon;
};

export type SidebarData = {
  navMain: NavMainItem[];
  navSecondary: NavSecondaryItem[];
};
