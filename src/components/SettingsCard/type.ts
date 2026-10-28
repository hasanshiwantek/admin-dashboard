import { ReactNode } from "react";

export interface SettingsCardProps {
  /** Lets a side nav scroll to the card */
  id?: string;
  title?: string;
  description?: ReactNode;
  /** Shown right after the title, e.g. a "New" badge */
  titleAdornment?: ReactNode;
  /** Shown at the right of the header, e.g. a "Learn more" link */
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  titleClassName?: string;
}
