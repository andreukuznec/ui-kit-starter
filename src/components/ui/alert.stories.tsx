import type { Meta, StoryObj } from "@storybook/react-vite"

import { CircleAlert, CircleCheck, Info, TriangleAlert } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const meta = {
  title: "UI/Alert",
  component: Alert,
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Alert>
      <Info aria-hidden="true" />
      <AlertTitle>Heads up</AlertTitle>
      <AlertDescription>This is the default alert surface.</AlertDescription>
    </Alert>
  ),
}

export const Destructive: Story = {
  render: () => (
    <Alert variant="destructive">
      <CircleAlert aria-hidden="true" />
      <AlertTitle>Something went wrong</AlertTitle>
      <AlertDescription>The deploy did not finish. Check the logs and retry.</AlertDescription>
    </Alert>
  ),
}

export const Success: Story = {
  render: () => (
    <Alert variant="success">
      <CircleCheck aria-hidden="true" />
      <AlertTitle>Deploy succeeded</AlertTitle>
      <AlertDescription>Status tokens share these surfaces.</AlertDescription>
    </Alert>
  ),
}

export const Warning: Story = {
  render: () => (
    <Alert variant="warning">
      <TriangleAlert aria-hidden="true" />
      <AlertTitle>Cache is stale</AlertTitle>
      <AlertDescription>Refresh workstreams to pick up the latest run.</AlertDescription>
    </Alert>
  ),
}

export const InfoVariant: Story = {
  name: "Info",
  render: () => (
    <Alert variant="info">
      <Info aria-hidden="true" />
      <AlertTitle>New tokens available</AlertTitle>
      <AlertDescription>Info alerts use the same semantic color as badges.</AlertDescription>
    </Alert>
  ),
}
