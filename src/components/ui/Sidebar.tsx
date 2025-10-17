import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  LayoutDashboard,
  Receipt,
  FileText,
  Wallet,
  Settings,
  HelpCircle,
  LogOut,
  Search,
  Bell,
  User,
} from "lucide-react";

interface SidebarProps {
  user?: {
    fullName: string;
    avatar?: string;
  };
  onLogout?: () => void;
}

const navigationItems = [
  { name: "Dashboard", href: "/dashboard", icon: "/DashboardLogo.png" },
  {
    name: "Transactions",
    href: "https://nodelabs.software/",
    icon: "/Transactions.png",
  },
  {
    name: "Invoices",
    href: "https://nodelabs.software/",
    icon: "/Invoices.png",
  },
  {
    name: "My Wallets",
    href: "https://nodelabs.software/",
    icon: "/MyWallet.png",
  },
  {
    name: "Settings",
    href: "https://nodelabs.software/",
    icon: "/Settings.png",
  },
];

const bottomItems = [
  { name: "Help", href: "https://nodelabs.software/", icon: "/Help.png" },
  { name: "Logout", href: "#", icon: LogOut, action: true },
];

export function Sidebar({ user, onLogout }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div
      className="w-64 flex flex-col h-screen"
      style={{ backgroundColor: "#FAFAFA" }}
    >
      {/* Logo */}
      <div className="p-6">
        <div
          className="flex items-center cursor-pointer"
          style={{ width: "122px", height: "30px" }}
        >
          <Image
            src="/Logo.png"
            alt="Maglo"
            width={122}
            height={30}
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigationItems.map((item) => {
            // Pathname matching - trailing slash'i de kontrol et
            const normalizedPathname = pathname.replace(/\/$/, '');
            const normalizedHref = item.href.replace(/\/$/, '');
            const isActive = normalizedPathname === normalizedHref;
            const isDashboard = item.name === "Dashboard";

            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    item.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className={`flex items-center px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer ${
                    isDashboard && isActive ? "font-semibold" : "font-medium"
                  }`}
                  style={{
                    backgroundColor: isDashboard && isActive ? "#C8EE44" : "transparent",
                    color: isDashboard && isActive ? "#1B212D" : "#929EAE",
                  }}
                >
                  <Image
                    src={item.icon as string}
                    alt={item.name}
                    width={20}
                    height={20}
                    className="mr-3"
                  />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom Section */}
      <div className="p-4 -mt-8">
        <ul className="space-y-2">
          {bottomItems.map((item) => {
            if (item.action && item.name === "Logout") {
              return (
                <li key={item.name}>
                  <button
                    onClick={onLogout}
                    className="flex items-center w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer"
                    style={{ color: "#929EAE" }}
                  >
                    <LogOut className="w-5 h-5 mr-3" />
                    {item.name}
                  </button>
                </li>
              );
            }

            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    item.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer"
                  style={{ color: "#929EAE" }}
                >
                  <Image
                    src={item.icon as string}
                    alt={item.name}
                    width={20}
                    height={20}
                    className="mr-3"
                  />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export function Header({
  user,
}: {
  user?: { fullName: string; avatar?: string };
}) {
  return (
    <header className="bg-white px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left Side - Dashboard Title */}
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>

        {/* Right Side - Actions and Profile */}
        <div className="flex items-center space-x-4">
          <button
            className="p-2 hover:text-gray-900 cursor-pointer"
            style={{ color: "#929EAE" }}
          >
            <Search className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-600 hover:text-gray-900 cursor-pointer">
            <Image
              src="/Ring.png"
              alt="Notifications"
              width={20}
              height={20}
              className="object-contain"
            />
          </button>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center">
              <Image
                src="/TopProfile.png"
                alt="Profile"
                width={32}
                height={32}
                className="object-cover w-full h-full"
              />
            </div>
            <span className="text-sm font-semibold text-gray-900">
              Mahfuzul Nabil
            </span>
            <button className="text-gray-400 hover:text-gray-600 cursor-pointer">
              <Image
                src="/Dropdown.png"
                alt="Dropdown"
                width={16}
                height={16}
                className="object-contain"
              />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
