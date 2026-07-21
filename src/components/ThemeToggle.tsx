"use client";

import { useTheme } from "@/lib/useTheme";

export function ThemeToggle() {
  const { dark, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      className="flex items-center gap-2 rounded-pill bg-surface px-4 py-2 text-sm font-medium text-text-secondary border border-border hover:bg-surface-inset transition-colors"
    >
      {dark ? "☀️ Claro" : "🌙 Oscuro"}
    </button>
  );
}
