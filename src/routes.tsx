import { JSX } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'

import { useAuth } from './contexts/auth-context'
import { AppLayout } from './pages/_layouts/app'
import { AuthLayout } from './pages/_layouts/auth'
import { NotFound } from './pages/404'
import { Checkout } from './pages/app/checkout/checkout'
import { Dashboard } from './pages/app/dashboard/dashboard'
import { Invoices } from './pages/app/invoices/invoices'
import { Receivables } from './pages/app/receivables/receivables'
import { SignIn } from './pages/auth/sign-in'
import { SignUp } from './pages/auth/sign-up'

function PrivateRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />
  }

  return children
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <PrivateRoute>
        <AppLayout />
      </PrivateRoute>
    ),
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'invoices',
        element: <Invoices />,
      },
      {
        path: 'receivables',
        element: <Receivables />,
      },
      {
        path: 'checkout',
        element: <Checkout />,
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: '/sign-in',
        element: <SignIn />,
      },
      {
        path: '/sign-up',
        element: <SignUp />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
])
