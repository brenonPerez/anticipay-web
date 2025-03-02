import { zodResolver } from '@hookform/resolvers/zod'
import { Search, X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const orderFiltersSchema = z.object({
  number: z.string().optional(),
  amount: z.string().optional(),
  dueDate: z.string().optional(),
})

type OrderFiltersSchema = z.infer<typeof orderFiltersSchema>

export function InvoiceTableFilters() {
  const [searchParams, setSearchParams] = useSearchParams()

  const number = searchParams.get('number')
  const amount = searchParams.get('amount')
  const dueDate = searchParams.get('dueDate')

  const { register, handleSubmit, reset } = useForm<OrderFiltersSchema>({
    resolver: zodResolver(orderFiltersSchema),
    defaultValues: {
      number: number || '',
      amount: amount ? parseFloat(amount).toString() : undefined,
      dueDate: dueDate
        ? new Date(dueDate).toISOString().split('T')[0]
        : undefined,
    },
  })

  function handleFilter({ number, amount, dueDate }: OrderFiltersSchema) {
    setSearchParams((state) => {
      if (number) {
        state.set('number', number)
      } else {
        state.delete('number')
      }

      if (amount) {
        state.set('amount', amount.toString())
      } else {
        state.delete('amount')
      }

      if (dueDate) {
        state.set('dueDate', new Date(dueDate).toISOString())
      } else {
        state.delete('dueDate')
      }

      state.set('page', '1')

      return state
    })
  }

  function handleClearFilters() {
    setSearchParams((state) => {
      state.delete('number')
      state.delete('amount')
      state.delete('dueDate')
      state.set('page', '1')

      return state
    })
    reset({
      number: '',
      amount: '',
      dueDate: '',
    })
  }

  return (
    <form
      onSubmit={handleSubmit(handleFilter)}
      className="flex items-center gap-2"
    >
      <span className="text-sm font-semibold">Filtros:</span>
      <Input
        placeholder="Número da nota fiscal"
        className="h-8 w-auto"
        {...register('number')}
      />
      <Input
        placeholder="Valor da nota fiscal"
        className="h-8 w-auto"
        {...register('amount')}
      />
      <Input
        placeholder="Data de vencimento da nota fiscal"
        className="h-8 w-[320px]"
        type="date"
        {...register('dueDate')}
      />
      <Button variant="secondary" size="xs" type="submit">
        <Search className="mr-2 h-4 w-4" />
        Filtrar resultados
      </Button>
      <Button
        onClick={handleClearFilters}
        variant="outline"
        size="xs"
        type="button"
      >
        <X className="mr-2 h-4 w-4" />
        Remover filtros
      </Button>
    </form>
  )
}
