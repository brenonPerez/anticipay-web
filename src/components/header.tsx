import { Building, Home, ScrollText, ShoppingCart } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import { NavLink } from './nav-link'
import { Separator } from './ui/separator'

export function Header() {
  const [cartItemCount] = useState(3)

  return (
    <div className="border-b">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-6">
          <Building className="h-6 w-6" />

          <Separator orientation="vertical" className="h-6" />

          <nav className="flex items-center space-x-4 lg:space-x-6">
            <NavLink to="/">
              <Home className="h-4 w-4" />
              Início
            </NavLink>
            <NavLink to="/invoices">
              <ScrollText className="h-4 w-4" />
              Notas Fiscais
            </NavLink>
          </nav>
        </div>

        <div className="relative">
          <Link to="/checkout">
            <ShoppingCart className="h-6 w-6" />
            <div className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-xs text-destructive-foreground">
              {cartItemCount}
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
