import { SignInResponse } from '@/api/auth'
import { BusinessType } from '@/constants/businessType'
import { api } from '@/lib/axios'

export interface RegisterCompanyBody {
  cnpj: string
  name: string
  monthlyRevenue: number
  businessType: BusinessType
  email: string
  password: string
}

export async function registerCompany({
  cnpj,
  name,
  monthlyRevenue,
  businessType,
  email,
  password,
}: RegisterCompanyBody): Promise<SignInResponse> {
  const response = await api.post<SignInResponse>('/api/Company', {
    cnpj,
    name,
    monthlyRevenue,
    businessType,
    email,
    password,
  })

  return response.data
}
