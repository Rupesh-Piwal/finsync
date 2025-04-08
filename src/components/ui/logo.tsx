import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  showText?: boolean;
  variant?: "default" | "monochrome";
}

export function Logo({
  size = "md",
  className,
  showText = true,
  variant = "default",
}: LogoProps) {
  const sizes = {
    sm: { container: "h-8 w-8", text: "text-lg" },
    md: { container: "h-10 w-10", text: "text-xl" },
    lg: { container: "h-12 w-12", text: "text-2xl" },
  };

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div
        className={cn(
          "rounded-full flex items-center justify-center relative",
          sizes[size].container
        )}
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            variant === "default"
              ? "bg-gradient-to-br from-emerald-400 via-teal-500 to-emerald-600"
              : "bg-gradient-to-br from-zinc-800 to-zinc-900"
          )}
        ></div>

        <div className="absolute inset-0 rounded-full bg-black/5 backdrop-blur-[1px]"></div>
        <div className="absolute inset-[2px] rounded-full border border-white/20"></div>

        <div
          className="absolute top-0 left-0 w-full h-full rounded-full overflow-hidden opacity-60"
          style={{
            background:
              "linear-gradient(120deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 30%)",
          }}
        ></div>

        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="46"
            fill="none"
            stroke={
              variant === "default"
                ? "rgba(236, 253, 245, 0.4)"
                : "rgba(255, 255, 255, 0.2)"
            }
            strokeWidth="1"
            strokeDasharray="4 6"
          />
          <circle cx="50" cy="50" r="4" fill="white" />
          <circle cx="35" cy="35" r="2" fill="white" opacity="0.8" />
          <circle cx="65" cy="35" r="2" fill="white" opacity="0.8" />
          <circle cx="35" cy="65" r="2" fill="white" opacity="0.8" />
          <circle cx="65" cy="65" r="2" fill="white" opacity="0.8" />

          <line
            x1="50"
            y1="50"
            x2="35"
            y2="35"
            stroke="white"
            strokeWidth="1"
            opacity="0.6"
          />
          <line
            x1="50"
            y1="50"
            x2="65"
            y2="35"
            stroke="white"
            strokeWidth="1"
            opacity="0.6"
          />
          <line
            x1="50"
            y1="50"
            x2="35"
            y2="65"
            stroke="white"
            strokeWidth="1"
            opacity="0.6"
          />
          <line
            x1="50"
            y1="50"
            x2="65"
            y2="65"
            stroke="white"
            strokeWidth="1"
            opacity="0.6"
          />

          {/* Removed: animate-data-flow-1/2/3/4 */}
          <circle cx="42.5" cy="42.5" r="1" fill="white" />
          <circle cx="57.5" cy="42.5" r="1" fill="white" />
          <circle cx="42.5" cy="57.5" r="1" fill="white" />
          <circle cx="57.5" cy="57.5" r="1" fill="white" />
        </svg>

        <div className="relative z-10 flex items-center justify-center w-1/2 h-1/2">
          <svg viewBox="0 0 24 24" className="w-full h-full text-white">
            <path
              d="M3 12h4v8H3v-8zm7-8h4v16h-4V4zm7 4h4v12h-4V8z"
              fill="currentColor"
              className="opacity-90"
            />
          </svg>
        </div>
      </div>

      {showText && (
        <div className="flex flex-col">
          <span
            className={cn(
              "font-bold tracking-tight",
              sizes[size].text,
              variant === "default"
                ? "bg-gradient-to-r from-emerald-400 via-teal-500 to-emerald-400 bg-clip-text text-transparent"
                : "text-zinc-800 dark:text-white"
            )}
          >
            FinSync
          </span>
        </div>
      )}
    </div>
  );
}
