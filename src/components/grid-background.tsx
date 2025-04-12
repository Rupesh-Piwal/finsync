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

          "[background-image:linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)]",

          "dark:[background-image:linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)]"
        )}
        aria-hidden="true"
      />
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
}
