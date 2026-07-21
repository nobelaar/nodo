import { cn } from "@/lib/utils";

interface RoleChipProps {
  label: string;
  confirmed?: boolean;
  className?: string;
}

export function RoleChip({ label, confirmed = false, className }: RoleChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-pill px-3 py-1 text-xs font-medium border transition-colors",
        confirmed
          ? "bg-primary/10 border-primary/30 text-primary"
          : "bg-surface-inset border-border text-text-secondary",
        className,
      )}
    >
      {label}
      {!confirmed && (
        <span className="size-1.5 rounded-full bg-warm-yellow" title="Pendiente de confirmación" />
      )}
    </span>
  );
}
