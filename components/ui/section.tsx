import { cn } from "@/lib/utils";

export function Section({
  id,
  eyebrow,
  title,
  copy,
  children,
  className
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  copy?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("relative min-h-screen overflow-hidden px-4 py-24 sm:px-6 lg:px-8", className)}>
      <div className="mx-auto max-w-7xl">
        {(eyebrow || title || copy) && (
          <div className="mx-auto mb-12 max-w-3xl text-center">
            {eyebrow && <p className="mb-4 text-xs font-semibold uppercase tracking-[0.32em] text-cyan">{eyebrow}</p>}
            {title && <h2 className="text-balance text-4xl font-semibold tracking-normal text-white sm:text-6xl">{title}</h2>}
            {copy && <p className="mt-5 text-lg leading-8 text-muted">{copy}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
