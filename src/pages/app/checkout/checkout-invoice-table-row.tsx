import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'

export interface Invoice {
  id: number
  number: string
  dueDate: Date
  grossValue: number
  netValue: number
}

interface CheckoutInvoiceTableRowProps {
  invoice: Invoice
}

export function CheckoutInvoiceTableRow({
  invoice,
}: CheckoutInvoiceTableRowProps) {
  return (
    <TableRow>
      <TableCell className="text-center">{invoice.number}</TableCell>
      <TableCell className="text-center">
        {format(new Date(invoice.dueDate), 'dd/MM/yyyy', { locale: ptBR })}
      </TableCell>
      <TableCell className="text-right">
        {invoice.grossValue.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}
      </TableCell>
      <TableCell className="text-right">
        {invoice.netValue.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}
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
