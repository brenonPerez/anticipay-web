import { ShoppingCart } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { getCartOpen } from '@/api/get-cart-open'

export function CartOpen() {
  const [cartItemCount, setCartItemCount] = useState(0)

  useEffect(() => {
    async function fetchCartOpen() {
      try {
        const data = await getCartOpen()
        setCartItemCount(data.invoiceCount)
      } catch (error) {
        console.error('Erro ao buscar itens do carrinho:', error)
      }
    }

    fetchCartOpen()
  }, [])

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
