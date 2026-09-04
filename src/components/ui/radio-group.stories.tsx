import type { Meta, StoryObj } from "@storybook/react-vite"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const meta = {
  title: "UI/Radio Group",
  component: RadioGroup,
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="comfortable" aria-label="Density">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="default" id="r-default" />
        <Label htmlFor="r-default">Default</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="comfortable" id="r-comfortable" />
        <Label htmlFor="r-comfortable">Comfortable</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="compact" id="r-compact" />
        <Label htmlFor="r-compact">Compact</Label>
      </div>
    </RadioGroup>
  ),
}

export const Horizontal: Story = {
  render: () => (
    <RadioGroup defaultValue="build" className="flex flex-row gap-4" aria-label="Stage">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="design" id="s-design" />
        <Label htmlFor="s-design">Design</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="build" id="s-build" />
        <Label htmlFor="s-build">Build</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="review" id="s-review" />
        <Label htmlFor="s-review">Review</Label>
      </div>
    </RadioGroup>
  ),
}
