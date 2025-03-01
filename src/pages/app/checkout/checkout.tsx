import { Helmet } from 'react-helmet-async'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { CheckoutInvoiceTableRow } from './checkout-invoice-table-row'

export function Checkout() {
  return (
    <>
      <Helmet>
        <title>Checkout de Antecipação de Recebíveis</title>
      </Helmet>
      <div className="p-6">
        <h1 className="mb-4 text-3xl font-bold tracking-tight">
          Checkout de Antecipação de Recebíveis
        </h1>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Informações da Empresa</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              <strong>Nome:</strong> Brenon Company
            </p>
            <p>
              <strong>CNPJ:</strong> 04.576.476/0001-26
            </p>
            <p>
              <strong>Limite de Crédito:</strong> R$ 20.000,00
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Notas Fiscais Selecionadas</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Número da nota</TableHead>
                  <TableHead>Data de Vencimento</TableHead>
                  <TableHead>Valor Bruto (R$)</TableHead>
                  <TableHead>Valor Líquido (R$)</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: 2 }).map((_, i) => (
                  <CheckoutInvoiceTableRow key={i} />
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Resumo Financeiro</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              <strong>Valor Bruto Total:</strong> R$ 1.500,00
            </p>
            <p>
              <strong>Valor Líquido Total:</strong> R$ 1.392,00
            </p>
          </CardContent>
        </Card>

        <div className="flex justify-end space-x-4">
          <Button variant="outline">Cancelar</Button>
          <Button>Confirmar Antecipação</Button>
        </div>
      </div>
    </>
  )
}
