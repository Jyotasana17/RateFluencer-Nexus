"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { navItems } from "@/lib/data";
import { cn } from "@/lib/utils";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <main className="mesh-bg min-h-screen pb-28 text-white">
      <div className="pointer-events-none fixed inset-0 panel-grid opacity-25" aria-hidden="true" />
      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-[8px] border border-cyan/30 bg-cyan/10 text-cyan shadow-cyan">
            <Sparkles className="h-5 w-5" />
          </span>
          <span>
            <span className="block text-sm font-semibold tracking-[0.24em]">RATEFLUENCER</span>
            <span className="block text-xs text-ghost">Nexus Command Layer</span>
          </span>
        </Link>
        <div className="hidden rounded-full border border-mint/25 bg-mint/10 px-4 py-2 text-xs font-medium text-mint sm:block">
          Live intelligence stream active
        </div>
      </header>
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
      <nav className="fixed inset-x-0 bottom-4 z-50 mx-auto max-w-[calc(100%-1.5rem)] px-2 sm:max-w-fit" aria-label="Dashboard navigation">
        <div className="glass mx-auto flex items-center gap-1 overflow-x-auto rounded-full p-2">
          {navItems.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative flex min-h-11 shrink-0 items-center gap-2 rounded-full px-3 text-xs font-medium text-ghost transition hover:text-white sm:px-4",
                  active && "text-white"
                )}
              >
                {active && (
                  <motion.span
                    layoutId="dock-active"
                    className="absolute inset-0 rounded-full bg-white/12 shadow-[0_0_30px_rgba(0,229,255,.25)]"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.55 }}
                  />
                )}
                <Icon className="relative h-4 w-4" />
                <span className="relative hidden sm:inline">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </main>
  );
}
