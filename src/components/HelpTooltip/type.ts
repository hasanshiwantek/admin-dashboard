import { ReactNode } from "react";

export interface HelpTooltipProps {
  content: ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  className?: string;
  iconClassName?: string;
  contentClassName?: string;
}
