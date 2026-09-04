import type { Meta, StoryObj } from "@storybook/react-vite"

import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const meta = {
  title: "UI/Textarea",
  component: Textarea,
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="grid w-full max-w-sm gap-2">
      <Label htmlFor="note">Note</Label>
      <Textarea id="note" placeholder="What should the team know?" />
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="grid w-full max-w-sm gap-2">
      <Label htmlFor="locked-note">Note</Label>
      <Textarea id="locked-note" disabled defaultValue="Read-only note" />
    </div>
  ),
}
