import { api } from '@/lib/axios'

export interface GetInvoicesQuery {
  pageIndex?: number | null
  number?: string | null
  amount?: number | null
  dueDate?: Date | null
}

export interface GetInvoicesResponse {
  invoices: {
    id: number
    number: string
    amount: number
    dueDate: Date
  }[]
  meta: {
    pageIndex: number
    perPage: number
    totalCount: number
  }
}

export async function getInvoices({
  pageIndex,
  number,
  amount,
  dueDate,
}: GetInvoicesQuery) {
  const response = await api.get<GetInvoicesResponse>('/api/Invoices/all', {
    params: {
      pageIndex,
      number,
      amount,
      dueDate,
    },
  })

  return response.data
}
