import { useQuery } from '@tanstack/react-query'
import { ShoppingCart } from 'lucide-react'
import { Link } from 'react-router-dom'

import { getCartOpen } from '@/api/get-cart-open'

export function CartOpen() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['cart-open'],
    queryFn: getCartOpen,
  })

  let cartItemCount = data?.invoiceCount || 0

  if (isLoading) {
    return <div>Carregando...</div>
  }

  if (error) {
    cartItemCount = 0
  }

  return (
    <div className="relative mr-4">
      <Link to="/checkout">
        <ShoppingCart className="h-6 w-6" />
        <div className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-xs text-destructive-foreground">
          {cartItemCount}
        </div>
      </Link>
    </div>
  )
}
