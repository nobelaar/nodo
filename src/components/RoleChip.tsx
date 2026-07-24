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
        "inline-flex items-center gap-[5px] rounded-pill px-[11px] py-[6px] text-xs font-medium transition-colors",
        confirmed
          ? "bg-primary/10 border border-primary/30 text-primary"
          : "bg-surface-inset text-text-secondary",
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
