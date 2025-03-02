import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { PrinterCheck } from 'lucide-react'
import { useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import { useReactToPrint } from 'react-to-print'
import { toast } from 'sonner'

import { checkoutCart } from '@/api/checkout-cart'
import { getCartOpenDetails } from '@/api/get-cart-open-details'
import { removeInvoiceInCart } from '@/api/remove-invoice'
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
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const [isCheckoutConfirmed, setIsCheckoutConfirmed] = useState(false)
  const componentRef = useRef<HTMLDivElement>(null)

  const { data, isLoading, error } = useQuery({
    queryKey: ['cart-open-details'],
    queryFn: getCartOpenDetails,
  })

  const { mutateAsync: removeFromCart } = useMutation({
    mutationFn: removeInvoiceInCart,
    onSuccess: () => {
      toast.success('Nota fiscal removida do carrinho sucesso!')
      queryClient.invalidateQueries({ queryKey: ['cart-open-details'] })
      queryClient.invalidateQueries({ queryKey: ['cart-open'] })
    },
  })

  const { mutateAsync: confirmCheckout } = useMutation({
    mutationFn: checkoutCart,
    onSuccess: () => {
      setIsCheckoutConfirmed(true)
      toast.success('Antecipação confirmada com sucesso!')
      queryClient.invalidateQueries({ queryKey: ['cart-open'] })
    },
  })

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: 'Comprovante de Antecipação',
    onAfterPrint: () => {
      toast.success('Comprovante impresso com sucesso!')
    },
  })

  if (isLoading) {
    return <div>Carregando...</div>
  }

  if (error) {
    return (
      <div className="py-20 text-center">
        <p className="text-2xl font-semibold text-muted-foreground">
          Erro ao carregar os detalhes do carrinho
        </p>
      </div>
    )
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
          <div className="mb-4 flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">
              Checkout de Antecipação de Recebíveis
            </h1>
            {isCheckoutConfirmed && (
              <Button
                variant="default"
                className="flex items-center gap-2 rounded-2xl px-6 py-2 shadow-md"
                onClick={() => handlePrint()}
              >
                <PrinterCheck className="h-5 w-5" />
                Imprimir Comprovante
              </Button>
            )}
          </div>
          <div ref={componentRef}>
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
                          {!isCheckoutConfirmed && (
                            <TableHead className="w-[50px]"></TableHead>
                          )}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {(invoices ?? []).map((invoice) => (
                          <CheckoutInvoiceTableRow
                            key={invoice.id}
                            invoice={invoice}
                            onRemove={() =>
                              removeFromCart({ invoiceId: invoice.id })
                            }
                            isCheckoutConfirmed={isCheckoutConfirmed}
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

                {!isCheckoutConfirmed && (
                  <div className="flex justify-end space-x-4">
                    <Button variant="outline" onClick={() => navigate('/')}>
                      Cancelar
                    </Button>
                    <Button onClick={() => confirmCheckout()}>
                      Confirmar Antecipação
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
