import type { Meta, StoryObj } from "@storybook/react-vite"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const meta = {
  title: "UI/Select",
  component: Select,
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-56" aria-label="Stage">
        <SelectValue placeholder="Choose a stage" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Stages</SelectLabel>
          <SelectItem value="design">Design</SelectItem>
          <SelectItem value="build">Build</SelectItem>
          <SelectItem value="review">Review</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
}

export const WithValue: Story = {
  render: () => (
    <Select defaultValue="build">
      <SelectTrigger className="w-56" aria-label="Stage">
        <SelectValue placeholder="Choose a stage" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="design">Design</SelectItem>
        <SelectItem value="build">Build</SelectItem>
        <SelectItem value="review">Review</SelectItem>
      </SelectContent>
    </Select>
  ),
}

export const Open: Story = {
  render: () => (
    <Select defaultValue="build" defaultOpen>
      <SelectTrigger className="w-56" aria-label="Stage">
        <SelectValue placeholder="Choose a stage" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="design">Design</SelectItem>
        <SelectItem value="build">Build</SelectItem>
        <SelectItem value="review">Review</SelectItem>
      </SelectContent>
    </Select>
  ),
}
