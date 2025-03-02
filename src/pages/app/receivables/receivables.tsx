import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { toast } from 'sonner'

import { addInvoiceInCart } from '@/api/add-invoice-in-cart'
import { getInvoicesNotInCart } from '@/api/get-invoices-not-in-cart'

import { ReceivablesCard } from './receivables-card'

export function Receivables() {
  const queryClient = useQueryClient()

  const { mutateAsync: addToCart } = useMutation({
    mutationFn: addInvoiceInCart,
    onSuccess: () => {
      toast.success('Nota fiscal adicionada no carrinho sucesso!')
      queryClient.invalidateQueries({ queryKey: ['invoices-not-in-cart'] })
      queryClient.invalidateQueries({ queryKey: ['cart-open'] })
    },
  })

  const { data: result, isLoading } = useQuery({
    queryKey: ['invoices-not-in-cart'],
    queryFn: getInvoicesNotInCart,
  })

  const hasInvoices = (result?.invoices?.length ?? 0) > 0

  return (
    <>
      <Helmet>
        <title>Antecipação de Recebíveis</title>
      </Helmet>

      <div className="p-6">
        <h1 className="mb-4 text-3xl font-bold tracking-tight">
          Antecipação de Recebíveis
        </h1>

        {isLoading ? (
          <p className="text-center text-lg">Carregando...</p>
        ) : hasInvoices ? (
          <div className="flex flex-wrap gap-4">
            {result?.invoices.map((invoice) => (
              <ReceivablesCard
                key={invoice.id}
                invoice={invoice}
                onAddToCart={(invoiceId) => addToCart({ invoiceId })}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-2xl font-semibold text-muted-foreground">
              Nenhuma nota fiscal disponível
            </p>
          </div>
        )}
      </div>
    </>
  )
}
