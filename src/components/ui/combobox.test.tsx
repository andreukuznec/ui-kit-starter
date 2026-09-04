import { fireEvent, render, screen } from "@testing-library/react"
import { useState } from "react"
import { describe, expect, it, vi } from "vitest"
import { axe } from "vitest-axe"

import { Combobox } from "@/components/ui/combobox"

const options = [
  { label: "Vite", value: "vite" },
  { label: "Next.js", value: "next" },
  { label: "Remix", value: "remix" },
  { label: "Astro", value: "astro" },
]

function Harness({ onValueChange = vi.fn() }: { onValueChange?: (value: string) => void }) {
  const [value, setValue] = useState("")

  return (
    <Combobox
      aria-label="Framework"
      options={options}
      placeholder="Select a framework"
      searchPlaceholder="Search frameworks…"
      value={value}
      onValueChange={(next) => {
        setValue(next)
        onValueChange(next)
      }}
    />
  )
}

describe("Combobox", () => {
  it("has no accessibility violations", async () => {
    const { container } = render(<Harness />)

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })

  it("opens on trigger click, filters options, and selects a value", () => {
    const onValueChange = vi.fn()
    render(<Harness onValueChange={onValueChange} />)

    fireEvent.click(screen.getByRole("combobox", { name: "Framework" }))
    expect(screen.getByRole("option", { name: "Vite" })).toBeInTheDocument()
    expect(screen.getByRole("option", { name: "Next.js" })).toBeInTheDocument()

    fireEvent.change(screen.getByPlaceholderText("Search frameworks…"), {
      target: { value: "astro" },
    })
    expect(screen.getByRole("option", { name: "Astro" })).toBeInTheDocument()
    expect(screen.queryByRole("option", { name: "Vite" })).not.toBeInTheDocument()
    expect(screen.queryByRole("option", { name: "Next.js" })).not.toBeInTheDocument()

    fireEvent.click(screen.getByRole("option", { name: "Astro" }))
    expect(onValueChange).toHaveBeenCalledWith("astro")
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument()
    expect(screen.getByRole("combobox", { name: "Framework" })).toHaveTextContent("Astro")
  })
})
