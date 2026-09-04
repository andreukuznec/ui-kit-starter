import type { Meta, StoryObj } from "@storybook/react-vite"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { month: "Mar", active: 186, churned: 24 },
  { month: "Apr", active: 214, churned: 18 },
  { month: "May", active: 237, churned: 21 },
  { month: "Jun", active: 269, churned: 16 },
  { month: "Jul", active: 301, churned: 19 },
  { month: "Aug", active: 348, churned: 14 },
]

const chartConfig = {
  active: { label: "Active", color: "var(--chart-1)" },
  churned: { label: "Churned", color: "var(--chart-5)" },
} satisfies ChartConfig

const meta = {
  title: "UI/Chart",
  component: ChartContainer,
} satisfies Meta<typeof ChartContainer>

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <ChartContainer config={chartConfig} className="h-52 w-full max-w-xl">
      <BarChart data={chartData} margin={{ left: -16, right: 8, top: 8 }}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="active" fill="var(--color-active)" radius={4} />
        <Bar dataKey="churned" fill="var(--color-churned)" radius={4} />
      </BarChart>
    </ChartContainer>
  ),
}
