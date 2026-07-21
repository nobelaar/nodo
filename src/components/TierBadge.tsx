import { cn } from "@/lib/utils";

type Tier = "tourist" | "scholar" | "standard" | "founder";

interface TierBadgeProps {
  tier: Tier;
  className?: string;
}

const tierStyles: Record<Tier, string> = {
  tourist: "bg-surface-inset text-text-muted",
  scholar: "bg-blue-raw/20 text-brand-blue",
  standard: "bg-mint-raw/20 text-brand-mint",
  founder: "bg-warm-yellow/20 text-warm-yellow",
};

const tierLabels: Record<Tier, string> = {
  tourist: "Tourist",
  scholar: "Scholar",
  standard: "Standard",
  founder: "Founder",
};

export function TierBadge({ tier, className }: TierBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-3 py-1 text-xs font-semibold font-display",
        tierStyles[tier],
        className,
      )}
    >
      {tierLabels[tier]}
    </span>
  );
}
