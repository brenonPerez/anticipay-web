import { Button } from '@/components/ui/button'
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function InvoiceRegister() {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Adicionar Nota Fiscal</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="number" className="text-right">
            Número
          </Label>
          <Input
            id="number"
            placeholder="Número da nota fiscal"
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="value" className="text-right">
            Valor
          </Label>
          <Input
            id="value"
            placeholder="Valor da nota fiscal"
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="dueDate" className="text-right">
            Data de Vencimento
          </Label>
          <Input id="dueDate" type="date" className="col-span-3" />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">Salvar</Button>
      </DialogFooter>
    </DialogContent>
  )
}
