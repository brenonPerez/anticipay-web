import { api } from '@/lib/axios'

export interface RemoveInvoiceInCartBody {
  invoiceId: number
}

export async function removeInvoiceInCart({
  invoiceId,
}: RemoveInvoiceInCartBody) {
  await api.delete('/api/Cart/remove-invoice', {
    data: {
      invoiceId,
    },
  })
}
