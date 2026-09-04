import { fireEvent, render, screen, within } from "@testing-library/react"
import { useState } from "react"
import { describe, expect, it, vi } from "vitest"
import { axe } from "vitest-axe"

import { MultiSelect } from "@/components/ui/multi-select"

const options = [
  { label: "Design", value: "design" },
  { label: "Docs", value: "docs" },
  { label: "API", value: "api" },
  { label: "A11y", value: "a11y" },
]

function Harness({ onValueChange = vi.fn() }: { onValueChange?: (value: string[]) => void }) {
  const [value, setValue] = useState<string[]>([])

  return (
    <MultiSelect
      aria-label="Tags"
      options={options}
      placeholder="Select tags"
      searchPlaceholder="Search tags…"
      value={value}
      onValueChange={(next) => {
        setValue(next)
        onValueChange(next)
      }}
    />
  )
}

describe("MultiSelect", () => {
  it("has no accessibility violations", async () => {
    const { container } = render(<Harness />)

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })

  it("renders badges for selected options and removes them", () => {
    const onValueChange = vi.fn()
    render(<Harness onValueChange={onValueChange} />)

    const trigger = screen.getByRole("combobox", { name: "Tags" })
    fireEvent.click(trigger)
    fireEvent.click(screen.getByRole("option", { name: "Design" }))
    fireEvent.click(screen.getByRole("option", { name: "Docs" }))
    expect(onValueChange).toHaveBeenNthCalledWith(1, ["design"])
    expect(onValueChange).toHaveBeenNthCalledWith(2, ["design", "docs"])

    expect(within(trigger).getByText("Design")).toBeInTheDocument()
    expect(within(trigger).getByText("Docs")).toBeInTheDocument()
    expect(within(trigger).getAllByRole("button", { name: /remove /i })).toHaveLength(2)

    fireEvent.click(within(trigger).getByRole("button", { name: "Remove Design" }))
    expect(onValueChange).toHaveBeenLastCalledWith(["docs"])
    expect(within(trigger).queryByText("Design")).not.toBeInTheDocument()
    expect(within(trigger).getByText("Docs")).toBeInTheDocument()
  })
})
