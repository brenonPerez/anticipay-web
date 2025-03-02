import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'

import { getCartOpenDetails } from '@/api/get-cart-open-details'
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
  const { data, isLoading } = useQuery({
    queryKey: ['cart-open-details'],
    queryFn: getCartOpenDetails,
  })

  if (isLoading) {
    return <div>Carregando...</div>
  }

  const {
    companyName,
    cnpj,
    creditLimit,
    invoices,
    totalNetValue,
    totalGrossValue,
  } = data || {}

  return (
    <>
      <Helmet>
        <title>Checkout de Antecipação de Recebíveis</title>
      </Helmet>
      <div className="p-6">
        <div>
          <h1 className="mb-4 text-3xl font-bold tracking-tight">
            Checkout de Antecipação de Recebíveis
          </h1>
          {(invoices ?? []).length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-2xl font-semibold text-muted-foreground">
                Nenhuma nota fiscal disponível
              </p>
            </div>
          ) : (
            <>
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Informações da Empresa</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    <strong>Nome:</strong> {companyName}
                  </p>
                  <p>
                    <strong>CNPJ:</strong> {cnpj}
                  </p>
                  <p>
                    <strong>Limite de Crédito:</strong>{' '}
                    {creditLimit
                      ? creditLimit.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        })
                      : 'N/A'}
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
                        <TableHead className="text-center">
                          Número da nota
                        </TableHead>
                        <TableHead className="text-center">
                          Data de Vencimento
                        </TableHead>
                        <TableHead className="text-right">
                          Valor Bruto (R$)
                        </TableHead>
                        <TableHead className="text-right">
                          Valor Líquido (R$)
                        </TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {(invoices ?? []).map((invoice) => (
                        <CheckoutInvoiceTableRow
                          key={invoice.id}
                          invoice={invoice}
                        />
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
                    <strong>Valor Bruto Total:</strong>{' '}
                    {(totalGrossValue ?? 0).toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </p>
                  <p>
                    <strong>Valor Líquido Total:</strong>{' '}
                    {(totalNetValue ?? 0).toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </p>
                </CardContent>
              </Card>

              <div className="flex justify-end space-x-4">
                <Button variant="outline">Cancelar</Button>
                <Button>Confirmar Antecipação</Button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}
