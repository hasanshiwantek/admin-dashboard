"use client"

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function DatePicker({
  date,
  onChange,
  placeholder = "Pick a date",
  dateFormat = "PPP",
  "aria-invalid": invalid,
  allowClear = true,
  className,
}: {
  date?: Date
  onChange?: (date: Date | undefined) => void
  placeholder?: string
  /** date-fns format for the selected date, e.g. "EEE, MMM dd, yyyy". */
  dateFormat?: string
  "aria-invalid"?: boolean
  /** When false, clicking the selected day keeps it instead of clearing. */
  allowClear?: boolean
  className?: string
}) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          aria-invalid={invalid}
          className={cn(
            "w-full max-w-md justify-start text-left font-normal cursor-pointer p-6 border border-gray-400 shadow-none text-lg",
            !date && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 !h-5 !w-5" />
          {date ? format(date, dateFormat) : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 " align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(selected) => {
            if (selected || allowClear) onChange?.(selected)
            setOpen(false)
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
