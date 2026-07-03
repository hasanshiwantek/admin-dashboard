"use client";

import { useState } from "react";
import * as Select from "@radix-ui/react-select";
import { CalendarDays, ChevronDown, Check } from "lucide-react";

const channels = [
  {
    label: "All channels",
    value: "all_channels",
  },
];

const periods = [
  {
    label: "Today",
    value: "today",
  },
  {
    label: "Week to date",
    value: "week_to_date",
  },
  {
    label: "Month to date",
    value: "month_to_date",
  },
  {
    label: "Year to date",
    value: "year_to_date",
  },
  {
    label: "Last 7 days",
    value: "last_7_days",
  },
  {
    label: "Last 30 days",
    value: "last_30_days",
  },
  {
    label: "Last 365 days",
    value: "last_365_days",
  },
];

const comparisons = [
  {
    label: "Previous period",
    value: "previous_period",
  },
  // {
  //   label: "Last year",
  //   value: "last_year",
  // },
];
  interface AnalyticsToolbarProps {
  filter: string;
  onFilterChange: (value: string) => void;
  dateRange: {
    from: string;
    to: string;
  } | null;
}
export default function AnalyticsToolbar({
  filter,
  onFilterChange,
    dateRange,
}: AnalyticsToolbarProps) {
  const [channel, setChannel] = useState("all_channels");
const [compare, setCompare] = useState("previous_period");

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-sm border border-[#E3E3E3] bg-white p-4">

      {/* Left */}

      <DashboardSelect
        value={channel}
        onChange={setChannel}
        items={channels}
        width="250px"
        
      />

      {/* Right */}

      <div className="flex flex-wrap items-center gap-3">

        {/* Date */}

        <button className="flex h-11 items-center gap-2 rounded-lg  bg-white px-4 text-[14px] !font-normal text-[#303030] hover:border-[#A8A8A8]">
         
          {dateRange
  ? `${dateRange.from} – ${dateRange.to}`
  : "Loading..."}
        </button>

        {/* Period */}

        <DashboardSelect
  value={filter}
  onChange={onFilterChange}
  items={periods}
  width="180px"
/>

        {/* Compare */}

        <div className="flex items-center gap-2">
          <span className="text-[14px] !font-normal text-[#545454]">
            Compared to
          </span>

          <DashboardSelect
            value={compare}
            onChange={setCompare}
            items={comparisons}
            width="190px"
          />
        </div>

      </div>
    </div>
  );
}

interface DashboardSelectProps {
  value: string;
  onChange: (value: string) => void;
  items: {
   label:string;
   value:string;
}[]
  width?: string;
}

function DashboardSelect({
  value,
  onChange,
  items,
  width = "200px",

}: DashboardSelectProps) {
  return (
    <Select.Root value={value} onValueChange={onChange}>
      <Select.Trigger
        style={{ width }}
        className="flex h-13 items-center justify-between rounded-sm border border-[#D9D9D9] bg-white px-4 text-[14px] !font-normal text-[#545454] outline-none transition hover:border-[#999] data-[state=open]:border-[#111827]"
      >
    <Select.Value
  aria-label={items.find((item) => item.value === value)?.label}
>
  {items.find((item) => item.value === value)?.label}
</Select.Value>

        <Select.Icon>
          <ChevronDown size={18} />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          position="popper"
          sideOffset={6}
          className="z-50 overflow-hidden rounded-xl border !font-normal border-[#E5E5E5] bg-white shadow-xl"
        >
          <Select.Viewport className="p-2">
            {items.map((item) => (
              <Select.Item
                key={item.value}
                value={item.value}
                className="relative flex cursor-pointer !font-normal select-none items-center rounded-md py-2.5 pl-3 pr-10 text-[14px] outline-none hover:bg-[#F5F5F5]"
              >
                <Select.ItemText>{item.label}</Select.ItemText>

                <Select.ItemIndicator className="absolute right-3">
                  <Check size={16} />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
    
  );
}