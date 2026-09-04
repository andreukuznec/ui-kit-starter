import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { afterEach, beforeEach, describe, expect, it } from "vitest"

import { ThemeProvider, useTheme } from "@/components/theme-provider"

const defaultMatchMedia = window.matchMedia

function ThemeProbe() {
  const { setTheme, theme } = useTheme()
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <button type="button" onClick={() => setTheme("light")}>
        set-light
      </button>
      <button type="button" onClick={() => setTheme("dark")}>
        set-dark
      </button>
      <button type="button" onClick={() => setTheme("system")}>
        set-system
      </button>
    </div>
  )
}

function stubMatchMedia(matches: boolean) {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    configurable: true,
    value: (query: string) => ({
      matches,
      media: query,
      onchange: null,
      addListener() {},
      removeListener() {},
      addEventListener() {},
      removeEventListener() {},
      dispatchEvent() {
        return false
      },
    }),
  })
}

function renderProvider() {
  return render(
    <ThemeProvider>
      <ThemeProbe />
    </ThemeProvider>,
  )
}

describe("ThemeProvider", () => {
  beforeEach(() => {
    window.localStorage.clear()
    document.documentElement.className = ""
    document.documentElement.style.colorScheme = ""
  })

  afterEach(() => {
    window.localStorage.clear()
    window.matchMedia = defaultMatchMedia
    document.documentElement.className = ""
    document.documentElement.style.colorScheme = ""
  })

  it("resolves system via matchMedia", () => {
    window.localStorage.setItem("theme", "system")
    stubMatchMedia(true)
    renderProvider()

    expect(screen.getByTestId("theme")).toHaveTextContent("system")
    expect(document.documentElement).toHaveClass("light")
    expect(document.documentElement).not.toHaveClass("dark")
    expect(document.documentElement.style.colorScheme).toBe("light")
    expect(window.localStorage.getItem("theme")).toBe("system")
  })

  it("resolves system to dark when matchMedia does not match light", () => {
    window.localStorage.setItem("theme", "system")
    stubMatchMedia(false)
    renderProvider()

    expect(screen.getByTestId("theme")).toHaveTextContent("system")
    expect(document.documentElement).toHaveClass("dark")
    expect(document.documentElement.style.colorScheme).toBe("dark")
  })

  it("falls back to dark for an invalid stored value", () => {
    window.localStorage.setItem("theme", "neon")
    renderProvider()

    expect(screen.getByTestId("theme")).toHaveTextContent("dark")
    expect(document.documentElement).toHaveClass("dark")
    expect(document.documentElement.style.colorScheme).toBe("dark")
  })

  it("persists setTheme to localStorage and applies the class", async () => {
    const user = userEvent.setup()
    renderProvider()

    expect(screen.getByTestId("theme")).toHaveTextContent("dark")

    await user.click(screen.getByRole("button", { name: "set-light" }))
    expect(screen.getByTestId("theme")).toHaveTextContent("light")
    expect(window.localStorage.getItem("theme")).toBe("light")
    expect(document.documentElement).toHaveClass("light")
    expect(document.documentElement.style.colorScheme).toBe("light")

    await user.click(screen.getByRole("button", { name: "set-system" }))
    expect(screen.getByTestId("theme")).toHaveTextContent("system")
    expect(window.localStorage.getItem("theme")).toBe("system")
  })
})
