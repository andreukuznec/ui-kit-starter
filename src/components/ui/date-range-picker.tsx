import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { type DateRange } from "react-day-picker"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

export type DateRangePickerProps = {
  date?: DateRange
  onDateChange?: (date: DateRange | undefined) => void
  placeholder?: string
  className?: string
  id?: string
  disabled?: boolean
  numberOfMonths?: number
  "aria-label"?: string
}

function DateRangePicker({
  date,
  onDateChange,
  placeholder = "Pick a date range",
  className,
  id,
  disabled,
  numberOfMonths = 2,
  "aria-label": ariaLabel,
}: DateRangePickerProps) {
  const formatted =
    date?.from &&
    (date.to ? `${format(date.from, "PP")} - ${format(date.to, "PP")}` : format(date.from, "PP"))

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id={id}
          type="button"
          variant="outline"
          disabled={disabled}
          aria-label={ariaLabel}
          className={cn(
            "w-full justify-start text-left font-normal",
            !formatted && "text-muted-foreground",
            className,
          )}
        >
          <CalendarIcon aria-hidden="true" />
          <span className="truncate">{formatted ?? placeholder}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="range"
          selected={date}
          onSelect={onDateChange}
          numberOfMonths={numberOfMonths}
        />
      </PopoverContent>
    </Popover>
  )
}

export { DateRangePicker }
export type { DateRange }
