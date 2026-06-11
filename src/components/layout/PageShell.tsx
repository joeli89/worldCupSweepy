import { SiteNav } from "@/components/layout/SiteNav";
import { SimplePageBackground } from "@/components/ui/SimplePageBackground";
import { StadiumBackground } from "@/components/ui/StadiumBackground";

type PageShellProps = {
  children: React.ReactNode;
  /** Use "simple" on form/content pages — avoids heavy stadium graphics */
  background?: "hero" | "simple";
};

export function PageShell({ children, background = "hero" }: PageShellProps) {
  return (
    <div className="relative min-h-screen bg-[#030510]">
      {background === "hero" ? <StadiumBackground /> : <SimplePageBackground />}
      <SiteNav />
      <main className="relative z-10">{children}</main>
    </div>
  );
}
