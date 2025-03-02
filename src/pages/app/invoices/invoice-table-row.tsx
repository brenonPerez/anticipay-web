import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { SquarePen, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'

export interface InvoiceTableRowProps {
  invoice: {
    id: number
    number: string
    amount: number
    dueDate: Date
  }
}

export function InvoiceTableRow({ invoice }: InvoiceTableRowProps) {
  return (
    <TableRow>
      <TableCell className="text-center font-mono text-xs font-medium">
        {invoice.number}
      </TableCell>
      <TableCell className="text-right text-muted-foreground">
        {invoice.amount.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}
      </TableCell>
      <TableCell className="text-center">
        {format(new Date(invoice.dueDate), 'dd/MM/yyyy', { locale: ptBR })}
      </TableCell>
      <TableCell className="text-right">
        <Button variant="outline" size="xs">
          <SquarePen className="mr-2 h-3 w-3" />
          Editar
        </Button>
      </TableCell>
      <TableCell className="text-right">
        <Button variant="outline" size="xs">
          <X className="mr-2 h-3 w-3" />
          Remover
        </Button>
      </TableCell>
    </TableRow>
  )
}
