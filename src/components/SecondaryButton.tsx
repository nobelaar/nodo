"use client";

import { type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface SecondaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "h-10 px-4 text-sm",
  md: "h-[54px] px-6 text-base",
  lg: "h-14 px-8 text-lg",
};

export function SecondaryButton({
  className,
  size = "md",
  children,
  ...props
}: SecondaryButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-pill font-display font-medium transition-all",
        "border border-border bg-surface text-text-primary",
        "hover:bg-surface-inset",
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
