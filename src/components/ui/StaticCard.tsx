import { cn } from "@/lib/utils";

/** Plain glass card — no animations, always visible */
export function StaticCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("glass-card relative overflow-hidden rounded-card", className)}>
      <div className="glass-noise" aria-hidden />
      <div className="glass-edge glass-edge-always" aria-hidden />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
