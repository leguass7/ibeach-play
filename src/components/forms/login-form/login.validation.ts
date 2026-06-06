import * as z from 'zod'

export const FormSiginSchema = z.object({
  email: z.string().email({ message: 'e-mail inválido' }),
  password: z.string().min(6, { message: 'Senha precisa ter 6 caracteres' })
})

export type FormSiginData = z.infer<typeof FormSiginSchema>
