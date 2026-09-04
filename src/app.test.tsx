import { render, screen } from "@testing-library/react"
import { axe } from "vitest-axe"
import { describe, expect, it } from "vitest"

import App from "@/app"
import { ThemeProvider } from "@/components/theme-provider"

function renderApp() {
  return render(
    <ThemeProvider>
      <App />
    </ThemeProvider>,
  )
}

describe("App", () => {
  it("renders the starter showcase", () => {
    renderApp()

    expect(screen.getByText("Relay UI")).toBeInTheDocument()
    expect(
      screen.getByRole("heading", { name: /build with the relay visual system/i }),
    ).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /commands/i })).toBeInTheDocument()
  })

  it("has no accessibility violations", async () => {
    const { container } = renderApp()

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })
})
