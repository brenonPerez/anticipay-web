import { api } from '@/lib/axios'

export interface GetCartClosedInfoResponse {
  totalAnticipatedForMonth: number
  previousMonthComparisonPercentage: number
}

export async function getCartClosedInfo() {
  const response = await api.get<GetCartClosedInfoResponse>(
    '/api/Cart/cart-closed-info',
  )

  return response.data
}
