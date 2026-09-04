import type { Meta, StoryObj } from "@storybook/react-vite"

import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Toaster } from "@/components/ui/sonner"

const meta = {
  title: "UI/Sonner",
  component: Toaster,
} satisfies Meta<typeof Toaster>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <>
      <Button type="button" onClick={() => toast.success("Workspace created")}>
        Show toast
      </Button>
      <Toaster />
    </>
  ),
}
