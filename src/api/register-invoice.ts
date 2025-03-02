import { api } from '@/lib/axios'

export interface RegisterInvoiceBody {
  number: string
  amount: number
  dueDate: Date
}

export async function registerInvoice({
  number,
  amount,
  dueDate,
}: RegisterInvoiceBody) {
  await api.post('/api/Invoices', {
    number,
    amount,
    dueDate,
  })
}
