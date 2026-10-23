import { StatusBadgeTone } from "./type";

export const STATUS_BADGE_TONE_CLASS: Record<StatusBadgeTone, string> = {
  success: "bg-green-700",
  neutral: "bg-gray-500",
  warning: "bg-yellow-600",
  danger: "bg-danger-red",
  info: "bg-primary-blue",
};
