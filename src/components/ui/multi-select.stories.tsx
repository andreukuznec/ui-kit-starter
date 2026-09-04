import type { Meta, StoryObj } from "@storybook/react-vite"

import { useState } from "react"

import { MultiSelect } from "@/components/ui/multi-select"

const options = [
  { label: "Design", value: "design" },
  { label: "Build", value: "build" },
  { label: "Review", value: "review" },
  { label: "Ship", value: "ship" },
]

const meta = {
  title: "UI/Multi Select",
  component: MultiSelect,
} satisfies Meta<typeof MultiSelect>

export default meta
type Story = StoryObj

function ControlledMultiSelect() {
  const [value, setValue] = useState<string[]>(["design", "build"])

  return (
    <MultiSelect
      aria-label="Tags"
      className="w-80"
      options={options}
      placeholder="Select tags"
      searchPlaceholder="Search tags…"
      value={value}
      onValueChange={setValue}
    />
  )
}

export const Default: Story = {
  render: () => <ControlledMultiSelect />,
}
