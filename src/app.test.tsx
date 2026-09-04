import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { afterEach, describe, expect, it } from "vitest"
import { axe } from "vitest-axe"

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
  afterEach(() => {
    window.location.hash = ""
  })
  it("renders the starter showcase", () => {
    renderApp()

    expect(screen.getByText("React component starter")).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "Overview" })).toBeInTheDocument()
    expect(
      screen.getByRole("heading", { name: /build with the relay visual system/i }),
    ).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /commands/i })).toBeInTheDocument()
    expect(screen.getByRole("checkbox", { name: "Email digest" })).toBeInTheDocument()
    expect(screen.getByRole("slider", { name: "Opacity" })).toBeInTheDocument()
    expect(screen.getByRole("tab", { name: "Guidance" })).toBeInTheDocument()
  })

  it("opens the command palette with ctrl+k", async () => {
    const user = userEvent.setup()
    renderApp()

    await user.keyboard("{Control>}k{/Control}")

    expect(screen.getByRole("dialog")).toBeInTheDocument()
    expect(screen.getByRole("heading", { name: "Command palette" })).toBeInTheDocument()
  })

  it("validates and submits the project form", async () => {
    const user = userEvent.setup()
    renderApp()

    await user.click(screen.getByRole("button", { name: "Create project" }))
    expect(screen.getByText("Give the project at least 3 characters.")).toBeInTheDocument()

    await user.type(screen.getByRole("textbox", { name: "Project name" }), "Mobile redesign")
    await user.click(screen.getByRole("button", { name: "Create project" }))

    expect(await screen.findByText("Project created")).toBeInTheDocument()
    expect(screen.getByRole("textbox", { name: "Project name" })).toHaveValue("")
  })

  it("navigates showcase sections from the sidebar", async () => {
    const user = userEvent.setup()
    renderApp()

    const charts = screen.getByRole("link", { name: "Charts" })
    await user.click(charts)

    expect(charts).toHaveAttribute("aria-current", "page")
    expect(screen.getByRole("link", { name: "Overview" })).not.toHaveAttribute("aria-current")
    expect(screen.getByRole("heading", { name: "Charts" })).toBeInTheDocument()
  })

  it("has no accessibility violations", async () => {
    const { container } = renderApp()

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })
})
