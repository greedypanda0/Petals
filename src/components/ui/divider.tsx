import React from "react";
import { cn } from "@/lib/utils"; // optional: Tailwind class merging

interface DividerProps {
  text?: string;
  className?: string;
}

export function Divider({ text, className }: DividerProps) {
  if (!text) {
    return <div className={cn("w-full border-t border-border", className)} />;
  }

  return (
    <div className={cn("w-full flex items-center gap-4", className)}>
      <div className="flex-grow border-t border-border" />
      <span className="text-sm text-muted-foreground whitespace-nowrap">
        {text}
      </span>
      <div className="flex-grow border-t border-border" />
    </div>
  );
}
