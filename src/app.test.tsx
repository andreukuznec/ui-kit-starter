import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import App from "@/app"
import { ThemeProvider } from "@/components/theme-provider"

describe("App", () => {
  it("renders the starter showcase", () => {
    render(
      <ThemeProvider>
        <App />
      </ThemeProvider>,
    )

    expect(screen.getByText("Relay UI")).toBeInTheDocument()
    expect(screen.getByRole("heading", { name: /build with the relay visual system/i })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /commands/i })).toBeInTheDocument()
  })
})
