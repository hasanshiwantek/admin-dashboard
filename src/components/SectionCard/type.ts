import { ReactNode } from "react";

export interface SectionCardProps {
  id?: string;
  title?: string;
  description?: ReactNode;
  titleAdornment?: ReactNode;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  titleClassName?: string;
}
