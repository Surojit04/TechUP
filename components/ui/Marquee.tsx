"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface MarqueeProps {
  children: React.ReactNode;
  direction?: "left" | "right";
  speedSeconds?: number;
  pauseOnHover?: boolean;
  reverseRow?: boolean;
  secondRowChildren?: React.ReactNode;
  gapClassName?: string;
  className?: string;
}

export function Marquee({
  children,
  direction = "left",
  speedSeconds = 35,
  pauseOnHover = true,
  reverseRow = false,
  secondRowChildren,
  gapClassName = "gap-8 md:gap-12 pr-8 md:pr-12",
  className,
}: MarqueeProps) {
  const renderRow = (
    rowContent: React.ReactNode,
    rowDirection: "left" | "right",
    keyPrefix: string
  ) => {
    return (
      <div
        className={cn(
          "flex w-max items-center motion-reduce:animate-none",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
        style={{
          animation: `marquee ${speedSeconds}s linear infinite ${
            rowDirection === "right" ? "reverse" : "normal"
          }`,
        }}
      >
        <div className={cn("flex items-center shrink-0", gapClassName)}>
          {rowContent}
        </div>
        <div
          aria-hidden="true"
          className={cn("flex items-center shrink-0", gapClassName)}
        >
          {rowContent}
        </div>
      </div>
    );
  };

  const oppositeDirection = direction === "left" ? "right" : "left";
  const hasSecondRow = reverseRow || Boolean(secondRowChildren);

  return (
    <div
      className={cn(
        "relative overflow-hidden w-full select-none flex flex-col gap-6",
        "[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]",
        className
      )}
    >
      {/* Row 1 */}
      {renderRow(children, direction, "row-1")}

      {/* Optional Second Row (Reverse Direction) */}
      {hasSecondRow &&
        renderRow(
          secondRowChildren || children,
          oppositeDirection,
          "row-2"
        )}
    </div>
  );
}
