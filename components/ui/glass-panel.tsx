import { cn } from "@/lib/utils";

export function GlassPanel({
  children,
  className,
  shimmer = false
}: {
  children: React.ReactNode;
  className?: string;
  shimmer?: boolean;
}) {
  return <div className={cn("glass rounded-[8px]", shimmer && "scanline", className)}>{children}</div>;
}
