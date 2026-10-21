import { ReactNode } from "react";

export interface SettingsNoticeProps {
  tone?: "info" | "warning" | "success";
  /** Leading icon matching the tone */
  showIcon?: boolean;
  children: ReactNode;
}

// Shared by several settings routes
export interface SettingsCardProps {
  title?: string;
  description?: ReactNode;
  /** Shown right after the title, e.g. a "New" badge */
  titleAdornment?: ReactNode;
  /** Shown at the right of the header, e.g. a "Learn more" link */
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}
