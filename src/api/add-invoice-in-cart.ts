import { api } from '@/lib/axios'

export interface AddInvoiceInCartBody {
  invoiceId: number
}

export async function addInvoiceInCart({ invoiceId }: AddInvoiceInCartBody) {
  await api.post('/api/Cart/add-invoice', {
    invoiceId,
  })
}
