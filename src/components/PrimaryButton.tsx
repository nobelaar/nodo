"use client";

import { type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "h-10 px-4 text-sm",
  md: "h-[54px] px-6 text-base",
  lg: "h-14 px-8 text-lg",
};

export function PrimaryButton({ className, size = "md", children, ...props }: PrimaryButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-pill font-display font-medium text-on-primary transition-all",
        "bg-linear-to-br from-brand-green to-brand-blue",
        "shadow-[0_4px_14px_rgba(17,88,176,0.33)]",
        "hover:opacity-90",
        "active:scale-[0.98]",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
