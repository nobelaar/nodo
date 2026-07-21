import { type InputHTMLAttributes, useId } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  className?: string;
}

export function Input({ label, error, className, ...props }: InputProps) {
  const id = useId();

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-medium text-text-secondary"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        className={cn(
          "h-12 rounded-md border border-border bg-surface px-4 text-base text-text-primary",
          "placeholder:text-text-muted",
          "focus:outline-hidden focus:ring-2 focus:ring-primary/40",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          error && "border-coral focus:ring-coral/40",
          className,
        )}
        {...props}
      />
      {error && (
        <p className="text-sm text-coral">{error}</p>
      )}
    </div>
  );
}
