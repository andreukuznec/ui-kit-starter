import type { Meta, StoryObj } from "@storybook/react-vite"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const meta = {
  title: "UI/Dialog",
  component: Dialog,
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

function DialogBody() {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create a workspace?</DialogTitle>
        <DialogDescription>
          This demonstrates the shared modal surface and focus handling.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button>Confirm</Button>
      </DialogFooter>
    </DialogContent>
  )
}

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open dialog</Button>
      </DialogTrigger>
      <DialogBody />
    </Dialog>
  ),
}

export const Open: Story = {
  render: () => (
    <Dialog defaultOpen>
      <DialogTrigger asChild>
        <Button variant="outline">Open dialog</Button>
      </DialogTrigger>
      <DialogBody />
    </Dialog>
  ),
}
