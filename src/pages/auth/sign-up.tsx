import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { registerCompany } from '@/api/register-company'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { BusinessType } from '@/constants/businessType'
import { useAuth } from '@/contexts/auth-context'

const signUpFormSchema = z
  .object({
    cnpj: z.string().min(14, 'CNPJ inválido').max(14, 'CNPJ inválido'),
    name: z.string(),
    monthlyRevenue: z
      .number()
      .positive('A receita deve ser um número positivo'),
    businessType: z.nativeEnum(BusinessType),
    email: z.string().email('E-mail inválido'),
    password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
    confirmPassword: z
      .string()
      .min(6, 'A confirmação da senha deve ter pelo menos 6 caracteres'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  })

type SignUpForm = z.infer<typeof signUpFormSchema>

export function SignUp() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpFormSchema),
  })

  const { mutateAsync: registerCompanyFn } = useMutation({
    mutationFn: registerCompany,
  })

  async function handleSignUp(data: SignUpForm) {
    try {
      const response = await registerCompanyFn({
        cnpj: data.cnpj,
        name: data.name,
        monthlyRevenue: data.monthlyRevenue,
        businessType: data.businessType,
        email: data.email,
        password: data.password,
      })

      login({ name: response.name }, response.token)

      toast.success('Empresa cadastrada com sucesso!')

      navigate('/')
    } catch (error) {
      toast.error('Erro ao cadastrar empresa.')
    }
  }

  return (
    <>
      <Helmet title="Cadastro" />

      <div className="p-8">
        <Button variant="ghost" asChild className="absolute right-8 top-8">
          <Link to="/sign-in">Fazer login</Link>
        </Button>

        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Criar conta
            </h1>
            <p className="text-sm text-muted-foreground">
              Registre sua empresa e comece a usar nossos serviços!
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(handleSignUp)}>
            <div className="space-y-2">
              <Label htmlFor="cnpj">CNPJ</Label>
              <Input id="cnpj" type="text" {...register('cnpj')} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Nome da Empresa</Label>
              <Input id="name" type="text" {...register('name')} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="monthlyRevenue">Receita Mensal</Label>
              <Input
                id="monthlyRevenue"
                type="number"
                {...register('monthlyRevenue', { valueAsNumber: true })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="businessType">Tipo de Negócio</Label>
              <Select
                onValueChange={(value) =>
                  setValue('businessType', Number(value) as BusinessType)
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione o tipo de negócio" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={BusinessType.Services.toString()}>
                    Serviços
                  </SelectItem>
                  <SelectItem value={BusinessType.Products.toString()}>
                    Produtos
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" type="email" {...register('email')} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input id="password" type="password" {...register('password')} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirme sua Senha</Label>
              <Input
                id="confirmPassword"
                type="password"
                {...register('confirmPassword')}
              />
            </div>

            <Button disabled={isSubmitting} className="w-full" type="submit">
              Cadastrar
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
