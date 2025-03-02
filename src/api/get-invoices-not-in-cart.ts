import { api } from '@/lib/axios'

export interface GetInvoicesResponse {
  invoices: {
    id: number
    number: string
    amount: number
    dueDate: Date
    amountReceivable: number
  }[]
}

export async function getInvoicesNotInCart() {
  const response = await api.get<GetInvoicesResponse>(
    '/api/Invoices/not-in-cart',
  )

  return response.data
}
