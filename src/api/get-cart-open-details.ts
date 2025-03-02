import { api } from '@/lib/axios'

export interface GetCartOpenDetailsResponse {
  companyName: string
  cnpj: string
  creditLimit: number
  invoices: {
    id: number
    number: string
    dueDate: Date
    grossValue: number
    netValue: number
  }[]
  totalNetValue: number
  totalGrossValue: number
}

export async function getCartOpenDetails() {
  const response = await api.get<GetCartOpenDetailsResponse>(
    '/api/Cart/cart-open-details',
  )

  return response.data
}
