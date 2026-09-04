import type { Meta, StoryObj } from "@storybook/react-vite"

import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

const meta = {
  title: "UI/Collapsible",
  component: Collapsible,
} satisfies Meta<typeof Collapsible>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Collapsible className="w-full max-w-sm space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">Starred workstreams</p>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm">
            Toggle
          </Button>
        </CollapsibleTrigger>
      </div>
      <p className="text-sm text-muted-foreground">Alpha tokens</p>
      <CollapsibleContent className="space-y-1 text-sm text-muted-foreground">
        <p>Beta docs</p>
        <p>Gamma review</p>
      </CollapsibleContent>
    </Collapsible>
  ),
}

export const Open: Story = {
  render: () => (
    <Collapsible defaultOpen className="w-full max-w-sm space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">Starred workstreams</p>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm">
            Toggle
          </Button>
        </CollapsibleTrigger>
      </div>
      <p className="text-sm text-muted-foreground">Alpha tokens</p>
      <CollapsibleContent className="space-y-1 text-sm text-muted-foreground">
        <p>Beta docs</p>
        <p>Gamma review</p>
      </CollapsibleContent>
    </Collapsible>
  ),
}
