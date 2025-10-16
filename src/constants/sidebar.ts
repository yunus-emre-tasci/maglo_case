/**
 * Sidebar navigation constants
 */

export interface SidebarItem {
  name: string;
  href: string;
  icon: string;
  isExternal?: boolean;
  isActive?: boolean;
}

export const SIDEBAR_NAVIGATION: SidebarItem[] = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: "/DashboardLogo.png",
    isExternal: false,
  },
  {
    name: "Transactions",
    href: "https://nodelabs.software/",
    icon: "/Transactions.png",
    isExternal: true,
  },
  {
    name: "Invoices",
    href: "https://nodelabs.software/",
    icon: "/Invoices.png",
    isExternal: true,
  },
  {
    name: "My Wallets",
    href: "https://nodelabs.software/",
    icon: "/MyWallet.png",
    isExternal: true,
  },
  {
    name: "Settings",
    href: "https://nodelabs.software/",
    icon: "/Settings.png",
    isExternal: true,
  },
];

export const SIDEBAR_BOTTOM_ITEMS: SidebarItem[] = [
  {
    name: "Help",
    href: "https://nodelabs.software/",
    icon: "/Help.png",
    isExternal: true,
  },
  {
    name: "Logout",
    href: "#",
    icon: "LogOut",
    isExternal: false,
  },
];

export const SIDEBAR_STYLES = {
  ACTIVE: {
    backgroundColor: "#C8EE44",
    color: "#1B212D",
    fontWeight: "semibold",
  },
  INACTIVE: {
    backgroundColor: "transparent",
    color: "#929EAE",
    fontWeight: "medium",
  },
} as const;
