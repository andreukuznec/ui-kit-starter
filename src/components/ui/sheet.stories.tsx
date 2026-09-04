import type { Meta, StoryObj } from "@storybook/react-vite"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const meta = {
  title: "UI/Sheet",
  component: Sheet,
} satisfies Meta<typeof Sheet>

export default meta
type Story = StoryObj<typeof meta>

function SheetBody() {
  return (
    <>
      <SheetHeader>
        <SheetTitle>Details</SheetTitle>
        <SheetDescription>
          Use sheets for secondary workflows without leaving context.
        </SheetDescription>
      </SheetHeader>
      <div className="py-6 text-sm text-muted-foreground">Your product content goes here.</div>
      <SheetFooter>
        <Button>Save changes</Button>
      </SheetFooter>
    </>
  )
}

export const Default: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open sheet</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetBody />
      </SheetContent>
    </Sheet>
  ),
}

export const Open: Story = {
  render: () => (
    <Sheet defaultOpen>
      <SheetTrigger asChild>
        <Button variant="outline">Open sheet</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetBody />
      </SheetContent>
    </Sheet>
  ),
}

export const Left: Story = {
  render: () => (
    <Sheet defaultOpen>
      <SheetTrigger asChild>
        <Button variant="outline">Open left sheet</Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetBody />
      </SheetContent>
    </Sheet>
  ),
}
