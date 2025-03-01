import { api } from '@/lib/axios'

export interface GetCartOpenResponse {
  id: number
  invoiceCount: number
}

export async function getCartOpen() {
  const response = await api.get<GetCartOpenResponse>('/api/Cart/cart-open')

  return response.data
}
