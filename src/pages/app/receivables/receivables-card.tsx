import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export function ReceivablesCard() {
  return (
    <Card className="w-[300px]">
      <CardHeader>
        <div className="mb-2">
          <CardTitle className="text-lg font-semibold">Nota Fiscal</CardTitle>
          <p className="text-base">1231423455</p>
        </div>
        <div>
          <CardDescription className="text-sm text-muted-foreground">
            Data de Vencimento
          </CardDescription>
          <p className="text-base">09/05/2025</p>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex justify-between">
          <span className="font-medium">Valor da nota:</span>
          <span>R$ 1.400,00</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Valor a Receber:</span>
          <span>R$ 1.313,34</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button>Adicionar ao Carrinho</Button>
      </CardFooter>
    </Card>
  )
}
