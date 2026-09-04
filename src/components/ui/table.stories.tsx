import type { Meta, StoryObj } from "@storybook/react-vite"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const meta = {
  title: "UI/Table",
  component: Table,
} satisfies Meta<typeof Table>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Table>
      <TableCaption>Recent workstreams</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Workstream</TableHead>
          <TableHead>Owner</TableHead>
          <TableHead className="text-right">Tasks</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Zeta launch</TableCell>
          <TableCell>Sam</TableCell>
          <TableCell className="text-right">12</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Alpha tokens</TableCell>
          <TableCell>Ana</TableCell>
          <TableCell className="text-right">8</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Beta docs</TableCell>
          <TableCell>Marc</TableCell>
          <TableCell className="text-right">5</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2}>Total</TableCell>
          <TableCell className="text-right">25</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
}
