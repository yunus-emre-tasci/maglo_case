"use client";

import { ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

export function PageContainer({
  children,
  className = "",
}: PageContainerProps) {
  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>{children}</div>
  );
}
