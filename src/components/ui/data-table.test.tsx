import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"
import { axe } from "vitest-axe"

import { type ColumnDef, DataTable } from "@/components/ui/data-table"

type Row = {
  name: string
  owner: string
}

const columns: ColumnDef<Row>[] = [
  {
    accessorKey: "name",
    header: "Workstream",
    cell: ({ row }) => row.getValue("name"),
  },
  {
    accessorKey: "owner",
    header: "Owner",
    cell: ({ row }) => row.getValue("owner"),
  },
]

const rows: Row[] = [
  { name: "Zeta launch", owner: "Sam" },
  { name: "Alpha tokens", owner: "Ana" },
  { name: "Beta docs", owner: "Marc" },
  { name: "Gamma review", owner: "Yuki" },
  { name: "Delta cleanup", owner: "Sam" },
]

function firstDataCell() {
  const table = screen.getByRole("table")
  const dataRows = within(table).getAllByRole("row").slice(1)
  return within(dataRows[0]!).getAllByRole("cell")[0]!
}

describe("DataTable", () => {
  it("renders rows", () => {
    render(<DataTable columns={columns} data={rows} pageSize={10} />)

    expect(screen.getByRole("cell", { name: "Zeta launch" })).toBeInTheDocument()
    expect(screen.getByRole("cell", { name: "Alpha tokens" })).toBeInTheDocument()
    expect(screen.getByRole("cell", { name: "Delta cleanup" })).toBeInTheDocument()
  })

  it("toggles sort order when a sortable header is clicked", async () => {
    const user = userEvent.setup()
    render(<DataTable columns={columns} data={rows} pageSize={10} />)

    expect(firstDataCell()).toHaveTextContent("Zeta launch")

    await user.click(screen.getByRole("button", { name: "Workstream" }))
    expect(firstDataCell()).toHaveTextContent("Alpha tokens")

    await user.click(screen.getByRole("button", { name: "Workstream" }))
    expect(firstDataCell()).toHaveTextContent("Zeta launch")
  })

  it("paginates with next and previous", async () => {
    const user = userEvent.setup()
    render(<DataTable columns={columns} data={rows} pageSize={2} />)

    expect(screen.getByRole("cell", { name: "Zeta launch" })).toBeInTheDocument()
    expect(screen.getByRole("cell", { name: "Alpha tokens" })).toBeInTheDocument()
    expect(screen.queryByRole("cell", { name: "Beta docs" })).not.toBeInTheDocument()

    const next = screen.getByRole("button", { name: "Next" })
    const previous = screen.getByRole("button", { name: "Previous" })
    expect(previous).toBeDisabled()

    await user.click(next)
    expect(screen.getByRole("cell", { name: "Beta docs" })).toBeInTheDocument()
    expect(screen.getByRole("cell", { name: "Gamma review" })).toBeInTheDocument()
    expect(screen.queryByRole("cell", { name: "Zeta launch" })).not.toBeInTheDocument()

    await user.click(next)
    expect(screen.getByRole("cell", { name: "Delta cleanup" })).toBeInTheDocument()
    expect(next).toBeDisabled()

    await user.click(previous)
    expect(screen.getByRole("cell", { name: "Beta docs" })).toBeInTheDocument()
  })

  it("has no accessibility violations", async () => {
    const { container } = render(<DataTable columns={columns} data={rows} pageSize={10} />)

    const results = await axe(container)
    expect(results.violations).toEqual([])
  })
})
