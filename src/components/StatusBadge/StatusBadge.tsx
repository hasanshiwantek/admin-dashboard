import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import { STATUS_BADGE_TONE_CLASS } from "./constant";
import { StatusBadgeProps } from "./type";

// Small uppercase pill, e.g. ENABLED / DISABLED
const StatusBadge = ({
  tone = "neutral",
  children,
  className,
}: StatusBadgeProps) => (
  <Badge
    className={cn(
      "rounded-sm px-3 text-[1.1rem] font-bold uppercase text-white",
      STATUS_BADGE_TONE_CLASS[tone],
      className,
    )}
  >
    {children}
  </Badge>
);

export default StatusBadge;
