import type { Meta, StoryObj } from "@storybook/react-vite"

import { useState } from "react"

import { type DateRange, DateRangePicker } from "@/components/ui/date-range-picker"

const preset: DateRange = {
  from: new Date(2026, 5, 15),
  to: new Date(2026, 5, 21),
}

const meta = {
  title: "UI/Date Range Picker",
  component: DateRangePicker,
} satisfies Meta<typeof DateRangePicker>

export default meta
type Story = StoryObj<typeof meta>

function ControlledRange() {
  const [date, setDate] = useState<DateRange | undefined>(preset)

  return (
    <DateRangePicker
      aria-label="Sprint range"
      className="w-72"
      date={date}
      numberOfMonths={2}
      onDateChange={setDate}
    />
  )
}

export const Default: Story = {
  render: () => <ControlledRange />,
}

export const Empty: Story = {
  render: () => (
    <DateRangePicker
      aria-label="Pick dates"
      className="w-72"
      numberOfMonths={1}
      placeholder="Pick a date range"
    />
  ),
}
