import { ArrowRight, X } from 'lucide-react'
import { Helmet } from 'react-helmet-async'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export function Invoices() {
  return (
    <>
      <Helmet title="Notas fiscais" />

      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Notas fiscais</h1>
      </div>
      <div className="space-y-2.5">
        <form className="flex items-center gap-2">
          <span className="text-sm font-semibold">Filtros:</span>
          <Input
            placeholder="Número da nota fiscal"
            className="h-8 w-[320px]"
          />
        </form>

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
                return (
                  <TableRow key={i}>
                    <TableCell className="font-mono text-xs font-medium">
                      821787128
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      R$ 1.573,86
                    </TableCell>
                    <TableCell>10/05/2025</TableCell>
                    <TableCell>
                      <Button variant="outline" size="xs">
                        <ArrowRight className="mr-2 h-3 w-3" />
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
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  )
}
