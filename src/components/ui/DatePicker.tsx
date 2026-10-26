"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/Button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "./Calendar";

export function DatePicker({
  date,
  onChange,
  placeholder = "Pick a date",
}: {
  date?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full max-w-md justify-start text-left font-normal cursor-pointer p-6 border border-gray-400 shadow-none text-lg",
            !date && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 !h-5 !w-5" />
          {date ? format(date, "PPP") : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 " align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={onChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
