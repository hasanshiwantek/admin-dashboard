import { ReactNode } from "react";

export interface TabItem {
  key: string;
  label: ReactNode;
  content?: ReactNode;
  disabled?: boolean;
}

export interface AppTabsProps<T extends TabItem = TabItem> {
  tabs: T[];
  activeTab?: string;
  defaultTab?: string;
  onTabChange?: (key: string) => void;
  maxVisibleTabs?: number;
  variant?: "pills" | "underline";
  className?: string;
  tabClassName?: string;
  activeTabClassName?: string;
  contentClassName?: string;
}
