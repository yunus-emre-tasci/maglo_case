"use client";

import { ReactNode } from "react";
import { Sidebar } from "@/components/ui/Sidebar";
import { PageHeader } from "./PageHeader";

interface MainContentProps {
  children: ReactNode;
  title?: string;
  className?: string;
}

export function MainContent({
  children,
  title = "Dashboard",
  className = "",
}: MainContentProps) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <PageHeader title={title} />
        <div className={`flex-1 ${className}`}>{children}</div>
      </div>
    </div>
  );
}
