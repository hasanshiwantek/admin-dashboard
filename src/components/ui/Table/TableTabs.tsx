"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { TableTabsProps } from "./types";

const styles = {
  pills: {
    container: "flex flex-wrap items-center gap-5 mb-4",
    tab: (active: boolean) =>
      cn(
        "!text-2xl 2xl:!text-[1.6rem] px-5 py-2 rounded cursor-pointer transition hover:bg-blue-100",
        active ? "bg-blue-100 border-blue-600 text-blue-600" : "text-blue-600",
      ),
    more: "!text-2xl 2xl:!text-[1.6rem] px-5 py-2 rounded text-blue-600 hover:bg-blue-100 flex items-center gap-2",
  },
  underline: {
    container: "flex 2xl:space-x-9 space-x-6 border-b mb-4",
    tab: (active: boolean) =>
      cn(
        "!text-2xl pb-3 border-b-3 whitespace-nowrap",
        active
          ? "border-blue-600 font-semibold text-black"
          : "border-transparent text-gray-500 hover:text-black",
      ),
    more: "!text-2xl pb-3 whitespace-nowrap text-gray-500 flex items-center gap-2 hover:text-black",
  },
};

export default function TableTabs({
  tabs,
  activeTab,
  onTabChange,
  maxVisibleTabs,
  variant = "pills",
}: TableTabsProps) {
  const s = styles[variant];
  const max = maxVisibleTabs ?? tabs.length;
  const fixed = tabs.slice(0, max);
  const overflow = tabs.slice(max);

  // A selected overflow tab is shown inline (so it stays highlighted).
  const activeOverflow = overflow.find((t) => t.key === activeTab);
  const visible = activeOverflow ? [...fixed, activeOverflow] : fixed;
  const menuTabs = overflow.filter((t) => t.key !== activeTab);

  return (
    <div className={s.container}>
      {visible.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onTabChange?.(tab.key)}
          className={s.tab(activeTab === tab.key)}
        >
          {tab.label}
        </button>
      ))}

      {menuTabs.length > 0 && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className={s.more}>
              More <ChevronDown className="w-5 h-5" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="min-w-[220px]">
            {menuTabs.map((tab) => (
              <DropdownMenuItem
                key={tab.key}
                className="cursor-pointer text-lg"
                onClick={() => onTabChange?.(tab.key)}
              >
                {tab.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}
