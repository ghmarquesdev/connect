'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { api } from '@/lib/axios'
import { toast } from 'sonner'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'

const schemaLoginForm = z.object({
  email: z.string().email({ message: 'Email invalido' }),
  password: z.string().min(6, 'A senha deve conter no mínimo 6 dígitos'),
})

type LoginForm = z.infer<typeof schemaLoginForm>

export function LoginForm() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(schemaLoginForm),
  })

  async function onSubmit({ email, password }: LoginForm) {
    try {
      const token = await api.post('/session', {
        email,
        password,
      })

      toast.success('Você fez o login com sucesso.')

      localStorage.setItem('connectify_token', JSON.stringify(token.data))

      router.push('/')
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response) {
          toast.error(err.response.data.message)

          return
        }
      }

      toast.error('Ocorreu um erro inesperado. Tente novamente mais tarde.')
    }
  }

  return (
    <>
      <Button
        asChild
        variant="ghost"
        className="hidden sm:block sm:absolute sm:top-6 sm:right-6"
      >
        <Link href="/accounts/register">Se cadastrar</Link>
      </Button>

      <div className="pt-5 max-w-72 sm:w-96 space-y-6">
        <h2 className="font-bold text-lg">Seja bem vindo novamente!</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email">Digite seu email</Label>
            <Input id="email" type="email" {...register('email')} />
            {errors.email && (
              <span className="mt-2 text-sm text-[#e51e3e]">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Digite sua senha</Label>
            <Input id="password" type="password" {...register('password')} />
            {errors.password && (
              <span className="mt-2 text-sm text-[#e51e3e]">
                {errors.password.message}
              </span>
            )}
          </div>

          <Button type="submit" variant="default" className="w-full">
            Entrar
          </Button>
        </form>

        <span className="text-sm sm:hidden">
          Ainda não possui conta?{' '}
          <Link href="/accounts/register" className="text-primary">
            clique aqui.
          </Link>
        </span>
      </div>
    </>
  )
}
