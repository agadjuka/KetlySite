export function BackgroundScanLines() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 hidden md:block">
      <div className="absolute w-[1px] h-full bg-gradient-to-b from-transparent via-white/10 to-transparent left-[20%] top-0 animate-scan-v" />
      <div className="absolute h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent left-0 top-[30%] animate-scan-h" />
      <div
        className="absolute w-[1px] h-full bg-gradient-to-b from-transparent via-white/5 to-transparent left-[70%] top-0 animate-scan-v"
        style={{ animationDelay: '4s' }}
      />
    </div>
  );
}
