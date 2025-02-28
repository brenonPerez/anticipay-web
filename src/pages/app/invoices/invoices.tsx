import { Helmet } from 'react-helmet-async'

import { Pagination } from '@/components/pagination'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { InvoiceTableRow } from './invoice-table-row'
import { InvoiceTableFilters } from './invoices-table-filters'

export function Invoices() {
  return (
    <>
      <Helmet title="Notas fiscais" />

      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Notas fiscais</h1>
      </div>
      <div className="space-y-2.5">
        <InvoiceTableFilters />
        <div className="container rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[140px]">Número</TableHead>
                <TableHead className="w-[140px]">Valor</TableHead>
                <TableHead className="w-[200px]">Data de vencimento</TableHead>
                <TableHead className="w-[50px]"></TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 10 }).map((_, i) => {
                return <InvoiceTableRow key={i} />
              })}
            </TableBody>
          </Table>
          <Pagination pageIndex={0} totalCount={105} perPage={10} />
        </div>
      </div>
    </>
  )
}
