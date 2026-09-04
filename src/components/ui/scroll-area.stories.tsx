import type { Meta, StoryObj } from "@storybook/react-vite"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

const tags = Array.from({ length: 20 }, (_, index) => `Workstream ${index + 1}`)

const meta = {
  title: "UI/Scroll Area",
  component: ScrollArea,
} satisfies Meta<typeof ScrollArea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <ScrollArea className="h-48 w-56 rounded-md border">
      <div className="p-4">
        <h2 className="mb-4 text-sm font-medium">Tags</h2>
        {tags.map((tag) => (
          <div key={tag}>
            <div className="text-sm">{tag}</div>
            <Separator className="my-2" />
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
}
