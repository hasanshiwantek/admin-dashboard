import { ReactNode } from "react";

// Shared by several settings routes
export interface SettingsCardProps {
  title?: string;
  description?: ReactNode;
  children: ReactNode;
  className?: string;
}
