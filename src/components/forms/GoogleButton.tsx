"use client";

import { Button } from "@/components/ui/Button";
import Image from "next/image";

interface GoogleButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function GoogleButton({
  onClick,
  disabled = false,
  className = "",
  children,
}: GoogleButtonProps) {
  return (
    <Button
      type="button"
      variant="outline"
      onClick={onClick}
      disabled={disabled}
      className={`w-full flex items-center justify-center space-x-2 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer ${className}`}
    >
      <Image
        src="/google-logo.png"
        alt="Google"
        width={20}
        height={20}
        className="w-5 h-5"
      />
      <span className="text-sm font-semibold" style={{ color: "#78778B" }}>
        {children}
      </span>
    </Button>
  );
}
