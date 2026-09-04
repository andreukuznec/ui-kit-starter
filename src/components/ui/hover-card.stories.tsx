import type { Meta, StoryObj } from "@storybook/react-vite"

import { Button } from "@/components/ui/button"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"

const meta = {
  title: "UI/Hover Card",
  component: HoverCard,
} satisfies Meta<typeof HoverCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">@relay</Button>
      </HoverCardTrigger>
      <HoverCardContent>
        <p className="text-sm font-medium">Relay UI</p>
        <p className="text-sm text-muted-foreground">Component kit with semantic tokens.</p>
      </HoverCardContent>
    </HoverCard>
  ),
}

export const Open: Story = {
  render: () => (
    <HoverCard defaultOpen>
      <HoverCardTrigger asChild>
        <Button variant="link">@relay</Button>
      </HoverCardTrigger>
      <HoverCardContent>
        <p className="text-sm font-medium">Relay UI</p>
        <p className="text-sm text-muted-foreground">Component kit with semantic tokens.</p>
      </HoverCardContent>
    </HoverCard>
  ),
}
