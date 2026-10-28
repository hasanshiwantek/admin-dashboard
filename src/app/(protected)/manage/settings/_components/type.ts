import { ReactNode } from "react";

export interface SettingsNoticeProps {
  tone?: "info" | "warning" | "success";
  /** Leading icon matching the tone */
  showIcon?: boolean;
  /** Shows a close button that calls this */
  onDismiss?: () => void;
  children: ReactNode;
}

