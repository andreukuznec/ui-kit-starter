import type { Meta, StoryObj } from "@storybook/react-vite"

import { Monitor, Moon, Sun } from "lucide-react"

import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"

const meta = {
  title: "Theme/Theme Provider",
  component: Button,
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

function ThemeControls() {
  const { setTheme, theme } = useTheme()

  return (
    <div className="space-y-3">
      <p className="text-sm">
        Active theme: <span className="font-medium">{theme}</span>
      </p>
      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          variant={theme === "dark" ? "default" : "outline"}
          onClick={() => setTheme("dark")}
        >
          <Moon aria-hidden="true" />
          Dark
        </Button>
        <Button
          type="button"
          variant={theme === "light" ? "default" : "outline"}
          onClick={() => setTheme("light")}
        >
          <Sun aria-hidden="true" />
          Light
        </Button>
        <Button
          type="button"
          variant={theme === "system" ? "default" : "outline"}
          onClick={() => setTheme("system")}
        >
          <Monitor aria-hidden="true" />
          System
        </Button>
      </div>
      <p className="text-sm text-muted-foreground">
        The Storybook theme toolbar also drives ThemeProvider. These buttons call useTheme().
      </p>
    </div>
  )
}

export const Default: Story = {
  render: () => <ThemeControls />,
}
