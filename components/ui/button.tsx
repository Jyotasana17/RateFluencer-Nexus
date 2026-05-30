import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  icon?: "arrow" | "play";
  className?: string;
};

export function NexusButton({ children, href, variant = "primary", icon = "arrow", className }: ButtonProps) {
  const Icon = icon === "play" ? Play : ArrowRight;
  const classes = cn(
    "group inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition duration-300 focus:outline-none focus:ring-2 focus:ring-cyan/70 focus:ring-offset-2 focus:ring-offset-void",
    variant === "primary" &&
      "bg-white text-void shadow-[0_0_46px_rgba(109,93,252,.36)] hover:bg-cyan hover:shadow-[0_0_54px_rgba(0,229,255,.42)]",
    variant === "secondary" && "glass text-white hover:border-cyan/50 hover:bg-white/15",
    variant === "ghost" && "text-muted hover:text-white",
    className
  );

  const content = (
    <>
      {children}
      <Icon className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return <button className={classes}>{content}</button>;
}
