"use client";

import AppTabs from "@/components/ui/AppTabs/AppTabs";
import { TableTab, TableTabsProps } from "./types";

export default function TableTabs(props: TableTabsProps) {
  return <AppTabs<TableTab> {...props} />;
}
