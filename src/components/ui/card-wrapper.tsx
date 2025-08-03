import React from "react";
import { Card, CardFooter, CardHeader, CardTitle } from "./card";
import type { CardWrapperProps } from "@/types";
import { cn } from "@/lib/utils"; // optional utility

export function CardWrapper({
  headerTitle = "Untitled",
  headerLabel,
  cardFooter,
  className,
  children,
}: CardWrapperProps) {
  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <header
          className="w-full flex flex-col items-center gap-y-4 text-center"
          aria-labelledby="card-title"
        >
          <CardTitle id="card-title" className="text-3xl font-semibold">
            {headerTitle}
          </CardTitle>
          {headerLabel && (
            <p className="text-muted-foreground text-sm sm:text-base">
              {headerLabel}
            </p>
          )}
        </header>
      </CardHeader>

      {children}

      {cardFooter && <CardFooter>{cardFooter}</CardFooter>}
    </Card>
  );
}