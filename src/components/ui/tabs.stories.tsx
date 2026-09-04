import type { Meta, StoryObj } from "@storybook/react-vite"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const meta = {
  title: "UI/Tabs",
  component: Tabs,
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="overview" className="w-full max-w-md">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="tokens">Tokens</TabsTrigger>
        <TabsTrigger value="charts">Charts</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">Kit overview and usage notes.</TabsContent>
      <TabsContent value="tokens">Semantic OKLCH tokens live in index.css.</TabsContent>
      <TabsContent value="charts">Charts read the same --chart-* tokens.</TabsContent>
    </Tabs>
  ),
}

export const Line: Story = {
  render: () => (
    <Tabs defaultValue="overview" className="w-full max-w-md">
      <TabsList variant="line">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="tokens">Tokens</TabsTrigger>
        <TabsTrigger value="charts">Charts</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">Line tabs underline the active item.</TabsContent>
      <TabsContent value="tokens">Semantic OKLCH tokens live in index.css.</TabsContent>
      <TabsContent value="charts">Charts read the same --chart-* tokens.</TabsContent>
    </Tabs>
  ),
}

export const Vertical: Story = {
  render: () => (
    <Tabs defaultValue="overview" orientation="vertical" className="w-full max-w-lg">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="tokens">Tokens</TabsTrigger>
        <TabsTrigger value="charts">Charts</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">Vertical tabs keep the list on the side.</TabsContent>
      <TabsContent value="tokens">Semantic OKLCH tokens live in index.css.</TabsContent>
      <TabsContent value="charts">Charts read the same --chart-* tokens.</TabsContent>
    </Tabs>
  ),
}
