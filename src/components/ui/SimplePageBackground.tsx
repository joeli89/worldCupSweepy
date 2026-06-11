export function SimplePageBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#030510]"
      aria-hidden
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#0c1f4a]/40 via-[#030510] to-[#030510]" />
      <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-neon-blue/10 blur-[120px]" />
      <div className="absolute -right-32 top-1/4 h-96 w-96 rounded-full bg-neon-purple/10 blur-[120px]" />
    </div>
  );
}
