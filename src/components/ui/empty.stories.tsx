import type { Meta, StoryObj } from "@storybook/react-vite"

import { Inbox } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

const meta = {
  title: "UI/Empty",
  component: Empty,
} satisfies Meta<typeof Empty>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Empty className="border">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Inbox aria-hidden="true" />
        </EmptyMedia>
        <EmptyTitle>No workstreams</EmptyTitle>
        <EmptyDescription>Create a workstream to start tracking progress.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button>New workstream</Button>
      </EmptyContent>
    </Empty>
  ),
}
