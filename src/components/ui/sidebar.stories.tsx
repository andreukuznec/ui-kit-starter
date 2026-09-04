import type { Meta, StoryObj } from "@storybook/react-vite"

import { BarChart3, LayoutDashboard, Palette, Settings2 } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"

const nav = [
  { title: "Overview", icon: LayoutDashboard },
  { title: "Tokens", icon: Palette },
  { title: "Charts", icon: BarChart3 },
  { title: "Settings", icon: Settings2 },
] as const

const meta = {
  title: "UI/Sidebar",
  component: Sidebar,
} satisfies Meta<typeof Sidebar>

export default meta
type Story = StoryObj<typeof meta>

function SidebarDemo({ defaultOpen = true }: { defaultOpen?: boolean }) {
  return (
    <SidebarProvider defaultOpen={defaultOpen} className="min-h-[28rem] rounded-xl border">
      <Sidebar collapsible="icon">
        <SidebarHeader className="px-3 py-3">
          <p className="truncate text-sm font-semibold text-sidebar-foreground">Relay UI</p>
          <p className="truncate text-xs text-sidebar-foreground/70">Component kit</p>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Showcase</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {nav.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton isActive={item.title === "Overview"} tooltip={item.title}>
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header className="flex h-12 items-center gap-2 border-b px-3">
          <SidebarTrigger />
          <span className="text-sm">Overview</span>
        </header>
        <div className="p-4 text-sm text-muted-foreground">
          Main content sits beside the sidebar.
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export const Default: Story = {
  render: () => <SidebarDemo />,
}

export const Collapsed: Story = {
  render: () => <SidebarDemo defaultOpen={false} />,
}
