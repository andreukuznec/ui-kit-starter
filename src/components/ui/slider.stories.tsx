import type { Meta, StoryObj } from "@storybook/react-vite"

import { Slider } from "@/components/ui/slider"

const meta = {
  title: "UI/Slider",
  component: Slider,
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    defaultValue: [40],
    max: 100,
    step: 1,
    "aria-label": "Volume",
    className: "w-64",
  },
}

export const Range: Story = {
  args: {
    defaultValue: [25, 75],
    max: 100,
    step: 1,
    "aria-label": "Price range",
    className: "w-64",
  },
}

export const Disabled: Story = {
  args: {
    defaultValue: [50],
    disabled: true,
    "aria-label": "Disabled slider",
    className: "w-64",
  },
}
