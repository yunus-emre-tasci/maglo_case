import React from "react";
import { Loader2 } from "lucide-react";

interface LoadingProps {
  size?: "sm" | "md" | "lg";
  text?: string;
  fullScreen?: boolean;
}

export function Loading({
  size = "md",
  text = "Loading...",
  fullScreen = false,
}: LoadingProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  const content = (
    <div className="flex flex-col items-center justify-center space-y-4">
      <Loader2 className={`${sizeClasses[size]} animate-spin text-[#C8EE44]`} />
      {text && (
        <p className="text-sm font-medium" style={{ color: "#1B212D" }}>
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
        {content}
      </div>
    );
  }

  return content;
}
