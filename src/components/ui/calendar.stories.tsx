import type { Meta, StoryObj } from "@storybook/react-vite"

import { Calendar } from "@/components/ui/calendar"

const selected = new Date(2026, 5, 15)
const range = {
  from: new Date(2026, 5, 15),
  to: new Date(2026, 5, 21),
}

const meta = {
  title: "UI/Calendar",
  component: Calendar,
} satisfies Meta<typeof Calendar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Calendar mode="single" selected={selected} defaultMonth={selected} today={selected} />
  ),
}

export const Range: Story = {
  render: () => (
    <Calendar
      mode="range"
      selected={range}
      defaultMonth={selected}
      today={selected}
      numberOfMonths={2}
    />
  ),
}
