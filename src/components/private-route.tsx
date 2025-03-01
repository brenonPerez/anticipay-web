import { Navigate, Outlet } from 'react-router-dom'

import { useAuth } from '@/contexts/auth-context'

export function PrivateRoute() {
  const { user } = useAuth()

  return user ? <Outlet /> : <Navigate to="/sign-in" />
}
