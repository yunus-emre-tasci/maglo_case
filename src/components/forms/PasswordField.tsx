"use client";

import { useState, forwardRef } from "react";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Eye, EyeOff } from "lucide-react";

interface PasswordFieldProps {
  label: string;
  name: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
  (
    {
      label,
      name,
      placeholder,
      value,
      onChange,
      onBlur,
      error,
      required = false,
      disabled = false,
      className = "",
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className={`space-y-2 ${className}`}>
        <Label htmlFor={name} className="text-sm font-bold text-gray-900">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
        <div className="relative">
          <Input
            ref={ref}
            id={name}
            name={name}
            type={showPassword ? "text" : "password"}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            disabled={disabled}
            className={`pr-10 ${
              error ? "border-red-500 focus:border-red-500" : ""
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            disabled={disabled}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

PasswordField.displayName = "PasswordField";
