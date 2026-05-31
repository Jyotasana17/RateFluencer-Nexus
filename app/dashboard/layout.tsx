"use client";

import { usePathname } from "next/navigation";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // If the path is exactly "/dashboard", render raw children to allow the custom
  // "Batman Tech Intelligence" lock screen & sidebar dashboard layout to control the viewport.
  if (pathname === "/dashboard") {
    return <>{children}</>;
  }

  return <DashboardShell>{children}</DashboardShell>;
}
