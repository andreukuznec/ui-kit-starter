import type { Meta, StoryObj } from "@storybook/react-vite"

import { Bold, Italic } from "lucide-react"

import { Toggle } from "@/components/ui/toggle"

const meta = {
  title: "UI/Toggle",
  component: Toggle,
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline"],
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg"],
    },
  },
} satisfies Meta<typeof Toggle>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    "aria-label": "Toggle bold",
    children: <Bold />,
  },
}

export const Outline: Story = {
  args: {
    variant: "outline",
    "aria-label": "Toggle italic",
    children: <Italic />,
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Toggle size="sm" aria-label="Bold small">
        <Bold />
      </Toggle>
      <Toggle aria-label="Bold default">
        <Bold />
      </Toggle>
      <Toggle size="lg" aria-label="Bold large">
        <Bold />
      </Toggle>
    </div>
  ),
}

export const Pressed: Story = {
  args: {
    defaultPressed: true,
    "aria-label": "Toggle bold",
    children: <Bold />,
  },
}
