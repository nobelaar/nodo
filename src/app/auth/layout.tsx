import { ThemeToggle } from "@/components/ThemeToggle";
import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-full bg-bg">
      <div className="flex-1 px-5 py-10 flex flex-col max-w-lg mx-auto w-full">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="font-display text-display-lg font-bold text-text-primary">Nodo Serrano</h1>
          <ThemeToggle />
        </div>
        {children}
      </div>
    </div>
  );
}
