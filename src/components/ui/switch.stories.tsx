import type { Meta, StoryObj } from "@storybook/react-vite"

import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

const meta = {
  title: "UI/Switch",
  component: Switch,
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Switch id="airplane" />
      <Label htmlFor="airplane">Airplane mode</Label>
    </div>
  ),
}

export const Checked: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Switch id="notify" defaultChecked />
      <Label htmlFor="notify">Notifications</Label>
    </div>
  ),
}

export const Small: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Switch id="compact" size="sm" defaultChecked />
      <Label htmlFor="compact">Compact</Label>
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Switch id="locked-switch" disabled />
      <Label htmlFor="locked-switch">Locked</Label>
    </div>
  ),
}
