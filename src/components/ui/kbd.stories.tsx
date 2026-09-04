import type { Meta, StoryObj } from "@storybook/react-vite"

import { Kbd, KbdGroup } from "@/components/ui/kbd"

const meta = {
  title: "UI/Kbd",
  component: Kbd,
} satisfies Meta<typeof Kbd>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <Kbd>⌘</Kbd>,
}

export const Shortcut: Story = {
  render: () => (
    <KbdGroup>
      <Kbd>⌘</Kbd>
      <Kbd>K</Kbd>
    </KbdGroup>
  ),
}
