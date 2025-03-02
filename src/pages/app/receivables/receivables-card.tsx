import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

interface ReceivablesCardProps {
  invoice: {
    id: number
    number: string
    amount: number
    dueDate: Date
    amountReceivable: number
  }
  onAddToCart: (invoiceId: number) => void
}

export function ReceivablesCard({
  invoice,
  onAddToCart,
}: ReceivablesCardProps) {
  return (
    <Card className="w-[300px]">
      <CardHeader>
        <div className="mb-2">
          <CardTitle className="text-lg font-semibold">Nota Fiscal</CardTitle>
          <p className="text-base">{invoice.number}</p>
        </div>
        <div>
          <CardDescription className="text-sm text-muted-foreground">
            Data de Vencimento
          </CardDescription>
          <p className="text-base">
            {new Date(invoice.dueDate).toLocaleDateString('pt-BR')}
          </p>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex justify-between">
          <span className="font-medium">Valor da nota:</span>
          <span>
            {invoice.amount.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Valor a Receber:</span>
          <span className="text-emerald-500 dark:text-emerald-400">
            {invoice.amountReceivable.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={() => onAddToCart(invoice.id)}>
          Adicionar ao Carrinho
        </Button>
      </CardFooter>
    </Card>
  )
}
