import { X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'

// interface InvoiceTableRowProps {}

export function CheckoutInvoiceTableRow() {
  return (
    <TableRow>
      <TableCell>1233495012</TableCell>
      <TableCell>09/05/2025</TableCell>
      <TableCell>750,00</TableCell>
      <TableCell>702,54</TableCell>
      <TableCell>
        <Button variant="outline" size="xs">
          <X className="mr-2 h-3 w-3" />
          Remover
        </Button>
      </TableCell>
    </TableRow>
  )
}
