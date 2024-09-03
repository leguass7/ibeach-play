import * as z from 'zod'

export const FormChangePasswordSchema = z
  .object({
    password: z.string().min(6, { message: 'Senha precisa ter 6 caracteres' }),
    confirmPassword: z.string().min(6, { message: 'Senha precisa ter 6 caracteres' })
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Senhas não conferem',
    path: ['confirmPassword']
  })

export type FormChangePasswordData = z.infer<typeof FormChangePasswordSchema>
