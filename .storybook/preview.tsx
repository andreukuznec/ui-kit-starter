import type { Preview } from "@storybook/react-vite"

import { useLayoutEffect } from "react"

import { ThemeProvider, useTheme } from "@/components/theme-provider"

import "@fontsource-variable/inter"

import "../src/index.css"

type ToolbarTheme = "dark" | "light"

function applyToolbarTheme(theme: ToolbarTheme) {
  try {
    window.localStorage.setItem("theme", theme)
  } catch {
    // Ignore quota / private-mode failures; the class still updates.
  }
  const root = document.documentElement
  root.classList.remove("light", "dark")
  root.classList.add(theme)
  root.style.colorScheme = theme
}

function ThemeSync({ theme }: { theme: ToolbarTheme }) {
  const { setTheme } = useTheme()

  useLayoutEffect(() => {
    setTheme(theme)
    applyToolbarTheme(theme)
  }, [setTheme, theme])

  return null
}

const preview: Preview = {
  tags: ["autodocs"],
  globalTypes: {
    theme: {
      description: "Color theme",
      toolbar: {
        title: "Theme",
        icon: "circlehollow",
        items: [
          { value: "dark", title: "Dark", icon: "moon" },
          { value: "light", title: "Light", icon: "sun" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: "dark",
  },
  parameters: {
    backgrounds: { disabled: true },
    layout: "fullscreen",
  },
  decorators: [
    (Story, context) => {
      const theme: ToolbarTheme = context.globals.theme === "light" ? "light" : "dark"
      applyToolbarTheme(theme)

      return (
        <ThemeProvider>
          <ThemeSync theme={theme} />
          <div className="min-h-svh bg-background p-6 text-foreground">
            <Story />
          </div>
        </ThemeProvider>
      )
    },
  ],
}

export default preview
