"use client";

import { forwardRef } from "react";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  (
    {
      label,
      name,
      type = "text",
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
    return (
      <div className={`space-y-2 ${className}`}>
        <Label htmlFor={name} className="text-sm font-bold text-gray-900">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
        <Input
          ref={ref}
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          className={error ? "border-red-500 focus:border-red-500" : ""}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

FormField.displayName = "FormField";
