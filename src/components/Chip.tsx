import { cn } from "@/lib/utils";

type ChipVariant =
  | "default"
  | "mint"
  | "blue"
  | "violet"
  | "coral"
  | "yellow"
  | "orange";

interface ChipProps {
  label: string;
  variant?: ChipVariant;
  className?: string;
}

const variantClasses: Record<ChipVariant, string> = {
  default: "bg-surface-inset text-text-secondary",
  mint: "bg-mint-raw/20 text-brand-mint",
  blue: "bg-blue-raw/20 text-brand-blue",
  violet: "bg-violet-raw/20 text-brand-violet",
  coral: "bg-coral/20 text-coral",
  yellow: "bg-warm-yellow/20 text-warm-yellow",
  orange: "bg-warm-orange/20 text-warm-orange",
};

export function Chip({ label, variant = "default", className }: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-pill px-3 py-1 text-xs font-medium",
        variantClasses[variant],
        className,
      )}
    >
      {label}
    </span>
  );
}
