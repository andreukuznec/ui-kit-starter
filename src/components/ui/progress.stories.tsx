import type { Meta, StoryObj } from "@storybook/react-vite"

import { Progress } from "@/components/ui/progress"

const meta = {
  title: "UI/Progress",
  component: Progress,
} satisfies Meta<typeof Progress>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    value: 64,
    "aria-label": "Sync progress",
    className: "w-64",
  },
}

export const Empty: Story = {
  args: {
    value: 0,
    "aria-label": "Empty progress",
    className: "w-64",
  },
}

export const Complete: Story = {
  args: {
    value: 100,
    "aria-label": "Complete progress",
    className: "w-64",
  },
}
