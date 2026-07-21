import { cn } from "@/lib/utils";

interface StatusBarProps {
  className?: string;
}

export function StatusBar({ className }: StatusBarProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between px-5 h-11 bg-bg text-text-secondary text-xs font-medium",
        className,
      )}
    >
      <span className="tabular-nums">9:41</span>
      <div className="flex items-center gap-1.5">
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <rect
            x="0.5"
            y="7.5"
            width="2"
            height="3.5"
            rx="0.5"
            fill="currentColor"
            fillOpacity="0.3"
          />
          <rect
            x="3.5"
            y="5.5"
            width="2"
            height="5.5"
            rx="0.5"
            fill="currentColor"
            fillOpacity="0.3"
          />
          <rect
            x="6.5"
            y="3.5"
            width="2"
            height="7.5"
            rx="0.5"
            fill="currentColor"
            fillOpacity="0.3"
          />
          <rect
            x="9.5"
            y="0.5"
            width="2"
            height="10.5"
            rx="0.5"
            fill="currentColor"
          />
        </svg>
        <svg width="26" height="12" viewBox="0 0 26 12" fill="none">
          <rect
            x="0.5"
            y="0.5"
            width="22"
            height="11"
            rx="2.5"
            stroke="currentColor"
            strokeOpacity="0.35"
          />
          <rect x="2" y="2" width="18" height="8" rx="1.5" fill="currentColor" />
          <rect
            x="23.5"
            y="3"
            width="2"
            height="6"
            rx="1"
            fill="currentColor"
            fillOpacity="0.4"
          />
        </svg>
      </div>
    </div>
  );
}
