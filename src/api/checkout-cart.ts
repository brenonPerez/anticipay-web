import { api } from '@/lib/axios'

export interface CheckoutCartResponse {
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

export async function checkoutCart() {
  const response = await api.post<CheckoutCartResponse>('/api/Cart/checkout')

  return response.data
}
