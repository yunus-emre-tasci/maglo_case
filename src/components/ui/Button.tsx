import React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  loading?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  icon,
  loading = false,
  className,
  children,
  ...props
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "focus:ring-[#C8EE44]",
    secondary: "bg-gray-100 hover:bg-gray-200 focus:ring-gray-400",
    outline:
      "border border-gray-300 bg-white hover:bg-gray-50 focus:ring-gray-400",
  };

  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-3 text-sm",
    lg: "px-6 py-4 text-base",
  };

  return (
    <button
      className={cn(baseClasses, variants[variant], sizes[size], className)}
      style={{ color: "#1B212D" }}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin mr-2" />
      ) : (
        icon && <span className="mr-2">{icon}</span>
      )}
      {children}
    </button>
  );
}
