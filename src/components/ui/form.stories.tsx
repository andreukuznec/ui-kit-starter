import type { Meta, StoryObj } from "@storybook/react-vite"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
})

type Values = z.infer<typeof schema>

const meta = {
  title: "UI/Form",
  component: Form,
} satisfies Meta<typeof Form>

export default meta
type Story = StoryObj

function NameForm() {
  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { name: "" },
  })

  return (
    <Form {...form}>
      <form className="w-full max-w-sm space-y-4" onSubmit={form.handleSubmit(() => undefined)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project name</FormLabel>
              <FormControl>
                <Input placeholder="New workspace" {...field} />
              </FormControl>
              <FormDescription>Shown on the workstream header.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export const Default: Story = {
  render: () => <NameForm />,
}
