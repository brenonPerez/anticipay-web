import { Building, Home, Receipt, ScrollText } from 'lucide-react'

import { AccountMenu } from './account-menu'
import { CartOpen } from './cart-open'
import { NavLink } from './nav-link'
import { Separator } from './ui/separator'

export function Header() {
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
            <NavLink to="/receivables">
              <Receipt className="h-4 w-4" />
              Antecipação de Recebíveis
            </NavLink>
          </nav>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <CartOpen />
          <AccountMenu />
        </div>
      </div>
    </div>
  )
}
