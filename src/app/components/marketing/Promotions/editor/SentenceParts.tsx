"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Trash2 } from "lucide-react";
import { ReactNode } from "react";
import { ICON_BUTTON, TEXT } from "./styles";

// BigCommerce builds rules, targeting and schedules as sentences:
// [If the customer] [Buys products ▾] / • [Reaching a] [Quantity ▾] [2] …

/** Bold sentence opener on a yellow background ("If the customer"). */
export const Pill = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => (
  <span
    className={cn(
      TEXT,
      "inline-flex items-center h-13 px-4 rounded-sm bg-[#fde58a] font-semibold! text-gray-900 whitespace-nowrap",
      className,
    )}
  >
    {children}
  </span>
);

/** Connecting words on a grey background ("Reaching a", "per cart"). */
export const Tag = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => (
  <span
    className={cn(
      TEXT,
      "inline-flex items-center min-h-13 px-4 py-1 rounded-sm bg-[#f4f4f6] text-gray-900 leading-tight",
      className,
    )}
  >
    {children}
  </span>
);

/**
 * An indented sentence clause marked with a yellow dot. `bullet={false}`
 * keeps the indent without the dot, for continuation rows ("And …").
 */
export const BulletRow = ({
  children,
  onRemove,
  bullet = true,
  className,
}: {
  children: ReactNode;
  onRemove?: () => void;
  bullet?: boolean;
  className?: string;
}) => (
  <div className={cn("flex items-start gap-4 pl-4", className)}>
    <span
      className={cn(
        "mt-[1.4rem] size-3 rounded-full shrink-0",
        bullet && "bg-[#fde58a]",
      )}
    />
    <div className="flex flex-1 flex-wrap items-center gap-3">{children}</div>
    {onRemove && (
      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label="Remove"
        className={ICON_BUTTON}
        onClick={onRemove}
      >
        <Trash2 />
      </Button>
    )}
  </div>
);
