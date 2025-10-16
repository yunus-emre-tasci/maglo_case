"use client";

import { ReactNode } from "react";

interface ContentAreaProps {
  children: ReactNode;
  className?: string;
}

export function ContentArea({ children, className = "" }: ContentAreaProps) {
  return <div className={`flex-1 p-6 ${className}`}>{children}</div>;
}
