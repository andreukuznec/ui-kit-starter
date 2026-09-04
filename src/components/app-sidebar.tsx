import { BarChart3, LayoutDashboard, Palette, Settings2 } from "lucide-react"
import { type ComponentProps, useEffect, useState } from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"

const nav = [
  { title: "Overview", icon: LayoutDashboard, href: "#showcase" },
  { title: "Tokens", icon: Palette, href: "#tokens" },
  { title: "Charts", icon: BarChart3, href: "#charts" },
  { title: "Settings", icon: Settings2, href: "#settings" },
] as const

function ShowcaseNav() {
  const { setOpenMobile } = useSidebar()
  const [activeHref, setActiveHref] = useState(() => window.location.hash || "#showcase")

  useEffect(() => {
    const sync = () => setActiveHref(window.location.hash || "#showcase")
    window.addEventListener("hashchange", sync)
    return () => window.removeEventListener("hashchange", sync)
  }, [])

  return (
    <SidebarMenu aria-label="Showcase">
      {nav.map((item) => {
        const isActive = activeHref === item.href
        return (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild isActive={isActive} tooltip={item.title}>
              <a
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                onClick={() => {
                  setActiveHref(item.href)
                  setOpenMobile(false)
                }}
              >
                <item.icon />
                <span>{item.title}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        )
      })}
    </SidebarMenu>
  )
}

export function AppSidebar(props: ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="px-3 py-3">
        <p className="truncate text-sm font-semibold text-sidebar-foreground">Relay UI</p>
        <p className="truncate text-xs text-sidebar-foreground/70">Component kit</p>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Showcase</SidebarGroupLabel>
          <SidebarGroupContent>
            <ShowcaseNav />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
