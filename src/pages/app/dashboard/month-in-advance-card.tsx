import { DollarSign } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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

export function MonthInAdvanceCard() {
  const [cartInfo, setCartInfo] = useState<GetCartClosedInfoResponse | null>(
    null,
  )

  useEffect(() => {
    getCartClosedInfo().then(setCartInfo)
  }, [])

  const percentage = cartInfo?.previousMonthComparisonPercentage ?? 0
  const formattedTotal = cartInfo
    ? `R$ ${cartInfo.totalAnticipatedForMonth.toFixed(2).replace('.', ',')}`
    : 'R$ 0,00'

  const percentageClass =
    percentage > 0
      ? 'text-emerald-500 dark:text-emerald-400'
      : percentage < 0
        ? 'text-red-500 dark:text-red-400'
        : 'text-muted-foreground'

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Total antecipado (mês)
        </CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        <span className="text-2xl font-bold tracking-tight">
          {formattedTotal}
        </span>
        <p className="text-xs text-muted-foreground">
          <span className={percentageClass}>{percentage.toFixed(0)}%</span> em
          relação ao mês passado
        </p>
      </CardContent>
    </Card>
  )
}
