import { useQuery } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { getInvoices } from '@/api/get-invoices'
import { Pagination } from '@/components/pagination'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { InvoiceRegister } from './invoice-register'
import { InvoiceTableRow } from './invoice-table-row'
import { InvoiceTableFilters } from './invoices-table-filters'

export function Invoices() {
  const [open, setOpen] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()

  const number = searchParams.get('number')
  const amount = searchParams.get('amount')
    ? Number(searchParams.get('amount'))
    : null
  const dueDate = searchParams.get('dueDate')
    ? new Date(searchParams.get('dueDate') as string)
    : null

  const pageIndex = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get('page') ?? '1')

  const { data: result, refetch } = useQuery({
    queryKey: ['invoices', pageIndex, number, amount, dueDate],
    queryFn: () =>
      getInvoices({
        pageIndex,
        number,
        amount,
        dueDate,
      }),
  })

  function handlePaginate(pageIndex: number) {
    setSearchParams((state) => {
      state.set('page', (pageIndex + 1).toString())

      return state
    })
  }

  return (
    <>
      <Helmet title="Notas fiscais" />

      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Notas fiscais</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => setOpen(true)}
              variant="default"
              className="flex items-center gap-2 rounded-2xl px-6 py-2 shadow-md"
            >
              <Plus className="h-5 w-5" />
              Adicionar Nota Fiscal
            </Button>
          </DialogTrigger>
          <InvoiceRegister
            onClose={() => {
              setOpen(false)
              refetch()
            }}
          />
        </Dialog>
      </div>
      <div className="space-y-2.5">
        <InvoiceTableFilters />
        <div className="container rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[140px] text-center">Número</TableHead>
                <TableHead className="w-[140px] text-right">Valor</TableHead>
                <TableHead className="w-[200px] text-center">
                  Data de vencimento
                </TableHead>
                <TableHead className="w-[50px]"></TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {result &&
                result.invoices.map((invoice) => {
                  return <InvoiceTableRow key={invoice.id} invoice={invoice} />
                })}
            </TableBody>
          </Table>
          {result && (
            <Pagination
              onPageChange={handlePaginate}
              pageIndex={pageIndex}
              totalCount={result.meta.totalCount}
              perPage={result.meta.perPage}
            />
          )}
        </div>
      </div>
    </>
  )
}
