import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GridBackgroundProps {
  children: ReactNode;
  className?: string;
}

export function GridBackground({ children, className }: GridBackgroundProps) {
  return (
    <div
      className={cn(
        "relative flex w-full items-center justify-center",
        className
      )}
    >
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:40px_40px]",
          // Light grid lines with lower opacity for emerald/teal compatibility
          "[background-image:linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)]",
          // Dark mode with even softer lines
          "dark:[background-image:linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)]"
        )}
        aria-hidden="true"
      />
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
}
