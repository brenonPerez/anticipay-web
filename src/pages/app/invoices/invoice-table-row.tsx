import { SquarePen, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'

// interface InvoiceTableRowProps {}

export function InvoiceTableRow() {
  return (
    <TableRow>
      <TableCell className="font-mono text-xs font-medium">821787128</TableCell>
      <TableCell className="text-muted-foreground">R$ 1.573,86</TableCell>
      <TableCell>10/05/2025</TableCell>
      <TableCell>
        <Button variant="outline" size="xs">
          <SquarePen className="mr-2 h-3 w-3" />
          Editar
        </Button>
      </TableCell>
      <TableCell>
        <Button variant="outline" size="xs">
          <X className="mr-2 h-3 w-3" />
          Remover
        </Button>
      </TableCell>
    </TableRow>
  )
}
