import React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export function Input({ label, error, icon, className, ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label
          className="block text-sm font-bold mb-2"
          style={{ color: "#000000" }}
        >
          {label}
        </label>
      )}
      <div className="relative">
        <input
          className={cn(
            "w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-colors",
            error && "border-red-500 focus:ring-red-500",
            icon && "pl-10",
            className
          )}
          {...props}
        />
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
