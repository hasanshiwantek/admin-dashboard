"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { CircleHelp } from "lucide-react";
import { HelpTooltipProps } from "./type";

// Filled "?" icon that shows `content` on hover or focus
const HelpTooltip = ({
  content,
  side = "top",
  className,
  iconClassName,
  contentClassName,
}: HelpTooltipProps) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <span
        tabIndex={0}
        aria-label="More info"
        className={cn("inline-flex cursor-help", className)}
      >
        <CircleHelp
          className={cn("size-6 fill-text-heading text-white", iconClassName)}
        />
      </span>
    </TooltipTrigger>
    <TooltipContent side={side} className={contentClassName}>
      {content}
    </TooltipContent>
  </Tooltip>
);

export default HelpTooltip;
