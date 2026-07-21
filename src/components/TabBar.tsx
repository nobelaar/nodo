import { cn } from "@/lib/utils";

type Tab = "inicio" | "plantel" | "nodo" | "agenda" | "perfil";

interface TabBarProps {
  active?: Tab;
  onTabChange?: (tab: Tab) => void;
  className?: string;
}

const tabs: { id: Tab; label: string; icon: string }[] = [
  { id: "inicio", label: "Inicio", icon: "🏠" },
  { id: "plantel", label: "Plantel", icon: "👥" },
  { id: "nodo", label: "Nodo", icon: "⚡" },
  { id: "agenda", label: "Agenda", icon: "📅" },
  { id: "perfil", label: "Perfil", icon: "👤" },
];

export function TabBar({
  active = "inicio",
  onTabChange,
  className,
}: TabBarProps) {
  return (
    <nav
      className={cn(
        "flex items-center justify-around bg-surface border-t border-border px-2 pt-2 pb-safe h-16",
        className,
      )}
    >
      {tabs.map((tab) => {
        const isActive = active === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange?.(tab.id)}
            className={cn(
              "flex flex-col items-center gap-0.5 min-w-0 flex-1 transition-colors",
              isActive
                ? "text-primary"
                : "text-text-muted hover:text-text-secondary",
            )}
          >
            <span className="text-lg leading-none">{tab.icon}</span>
            <span className="text-[10px] font-medium leading-tight">
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
