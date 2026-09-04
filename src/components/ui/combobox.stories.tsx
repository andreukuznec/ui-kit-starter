import type { Meta, StoryObj } from "@storybook/react-vite"

import { useState } from "react"

import { Combobox } from "@/components/ui/combobox"

const options = [
  { label: "Vite", value: "vite" },
  { label: "Next.js", value: "next" },
  { label: "Remix", value: "remix" },
  { label: "Astro", value: "astro" },
]

const meta = {
  title: "UI/Combobox",
  component: Combobox,
} satisfies Meta<typeof Combobox>

export default meta
type Story = StoryObj

function ControlledCombobox() {
  const [value, setValue] = useState("vite")

  return (
    <Combobox
      aria-label="Framework"
      className="w-64"
      options={options}
      placeholder="Select a framework"
      searchPlaceholder="Search frameworks…"
      value={value}
      onValueChange={setValue}
    />
  )
}

export const Default: Story = {
  render: () => <ControlledCombobox />,
}
