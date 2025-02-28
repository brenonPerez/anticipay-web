import { Search, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function InvoiceTableFilters() {
  return (
    <form className="flex items-center gap-2">
      <span className="text-sm font-semibold">Filtros:</span>
      <Input placeholder="Número da nota fiscal" className="h-8 w-auto" />
      <Input placeholder="Valor da nota fiscal" className="h-8 w-auto" />
      <Input
        placeholder="Data de vencimento da nota fiscal"
        className="h-8 w-[320px]"
      />
      <Button variant="secondary" size="xs" type="submit">
        <Search className="mr-2 h-4 w-4" />
        Filtrar resultados
      </Button>
      <Button variant="outline" size="xs" type="button">
        <X className="mr-2 h-4 w-4" />
        Remover filtros
      </Button>
    </form>
  )
}
