import * as z from 'zod'

export const FormArenaSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(3, { message: 'Nome precisa ter no mínimo 3 caracteres' }).max(255, { message: 'Nome muito longo' }),
  cityId: z.number().optional(), // FIXME: depois colocar obrigatório
  userId: z.number().optional() // FIXME: depois colocar obrigatório
})

export const UpdateArenaSchema = FormArenaSchema.partial()

export type FormArenaData = z.infer<typeof FormArenaSchema>
export type UpdateArenaData = z.infer<typeof UpdateArenaSchema>
