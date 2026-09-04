import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
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

    expect(screen.getByText("React component starter")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Overview" })).toBeInTheDocument()
    expect(
      screen.getByRole("heading", { name: /build with the relay visual system/i }),
    ).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /commands/i })).toBeInTheDocument()
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

  it("has no accessibility violations", async () => {
    const { container } = renderApp()

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })
})
