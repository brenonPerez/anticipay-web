import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { registerInvoice } from '@/api/register-invoice'
import { Button } from '@/components/ui/button'
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const registerInvoiceSchema = z.object({
  number: z.string().min(1, 'Número obrigatório'),
  amount: z
    .string()
    .transform((val) => parseFloat(val))
    .refine((val) => val > 0, {
      message: 'Valor deve ser maior que zero',
    }),
  dueDate: z.coerce.date({
    errorMap: () => ({ message: 'Data de vencimento obrigatória' }),
  }),
})

type RegisterInvoiceSchema = z.infer<typeof registerInvoiceSchema>

interface InvoiceRegisterProps {
  onClose: () => void
}

export function InvoiceRegister({ onClose }: InvoiceRegisterProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegisterInvoiceSchema>({
    resolver: zodResolver(registerInvoiceSchema),
  })

  async function handleRegister(data: RegisterInvoiceSchema) {
    try {
      await registerInvoice(data)
      toast.success('Nota fiscal registrada com sucesso!')
      reset()
      onClose()
    } catch (err) {
      toast.error('Erro ao registrar nota fiscal')
    }
  }

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Adicionar Nota Fiscal</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit(handleRegister)}>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="number" className="text-right">
              Número
            </Label>
            <div className="col-span-3">
              <Input
                id="number"
                placeholder="Número da nota fiscal"
                {...register('number')}
              />
              {errors.number && (
                <span className="text-sm text-red-500">
                  {errors.number.message}
                </span>
              )}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="amount" className="text-right">
              Valor
            </Label>
            <div className="col-span-3">
              <Input
                id="amount"
                placeholder="Valor da nota fiscal"
                type="number"
                step="0.01"
                {...register('amount')}
              />
              {errors.amount && (
                <span className="text-sm text-red-500">
                  {errors.amount.message}
                </span>
              )}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="dueDate" className="text-right">
              Data de Vencimento
            </Label>
            <div className="col-span-3">
              <Input id="dueDate" type="date" {...register('dueDate')} />
              {errors.dueDate && (
                <span className="text-sm text-red-500">
                  {errors.dueDate.message}
                </span>
              )}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Salvando...' : 'Salvar'}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
