import type { Meta, StoryObj } from "@storybook/react-vite"

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

const meta = {
  title: "UI/Data Table",
  component: DataTable,
} satisfies Meta<typeof DataTable>

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => <DataTable columns={columns} data={rows} pageSize={10} />,
}

export const Paginated: Story = {
  render: () => <DataTable columns={columns} data={rows} pageSize={2} />,
}
