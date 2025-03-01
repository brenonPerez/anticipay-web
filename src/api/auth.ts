import { useMutation } from '@tanstack/react-query'

import { api } from '@/lib/axios'

export interface SignInBody {
  email: string
  password: string
}

export interface SignInResponse {
  name: string
  token: string
}

export function useSignIn() {
  return useMutation<SignInResponse, Error, SignInBody>({
    mutationFn: async (data: SignInBody) => {
      const response = await api.post<SignInResponse>('/api/Login', data)
      return response.data
    },
  })
}
