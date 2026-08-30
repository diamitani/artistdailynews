"use client";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  className?: string;
  inverse?: boolean;
}

export function ArtispreneurLogo({ size = "md", showText = true, className = "", inverse = false }: LogoProps) {
  const sizeMap = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  };

  const textMap = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-lg",
    xl: "text-2xl",
  };

  return (
    <div className={`flex items-center space-x-2.5 ${className}`}>
      {/* Official Laurel + Crimson A Logo */}
      <div className={`relative shrink-0 rounded-full overflow-hidden flex items-center justify-center ${sizeMap[size]}`}>
        <img
          src="/artispreneur-logo.png"
          alt="Artispreneur Logo"
          className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(193,18,31,0.25)]"
        />
      </div>

      {showText && (
        <div className="flex flex-col text-left">
          <div className={`font-black tracking-tight flex items-center ${inverse ? "text-white" : "text-[var(--text-primary)]"} ${textMap[size]}`}>
            <span>ARTIS</span>
            <span className="text-[var(--accent-primary)] ml-0.5">PRENEUR</span>
          </div>
          <span className={`text-[8px] font-mono tracking-widest uppercase -mt-0.5 ${inverse ? "text-white/60" : "text-[var(--text-muted)]"}`}>
            Artispreneur.com
          </span>
        </div>
      )}
    </div>
  );
}
