import type { Meta, StoryObj } from "@storybook/react-vite"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const meta = {
  title: "UI/Accordion",
  component: Accordion,
} satisfies Meta<typeof Accordion>

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-full max-w-md" defaultValue="item-1">
      <AccordionItem value="item-1">
        <AccordionTrigger>What is this kit?</AccordionTrigger>
        <AccordionContent>Editable shadcn-style primitives with Relay tokens.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Can I change tokens?</AccordionTrigger>
        <AccordionContent>Yes. Tokens live in src/index.css under @theme inline.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Does it support dark mode?</AccordionTrigger>
        <AccordionContent>Dark is the default. Light is an override class.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

export const Multiple: Story = {
  render: () => (
    <Accordion type="multiple" className="w-full max-w-md" defaultValue={["item-1", "item-2"]}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Tokens</AccordionTrigger>
        <AccordionContent>OKLCH semantic colors with dark and light themes.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Components</AccordionTrigger>
        <AccordionContent>Radix primitives wrapped for the kit.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}
