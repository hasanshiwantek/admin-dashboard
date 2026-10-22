import { ReactNode } from "react";

export type StatusBadgeTone =
  | "success"
  | "neutral"
  | "warning"
  | "danger"
  | "info";

export interface StatusBadgeProps {
  tone?: StatusBadgeTone;
  children: ReactNode;
  className?: string;
}
