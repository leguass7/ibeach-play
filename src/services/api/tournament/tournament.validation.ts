import * as z from 'zod'

export const FormTournamentSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(3, { message: 'Nome precisa ter no mínimo 3 caracteres' }).max(255, { message: 'Nome muito longo' })
})

export const UpdateTournamentSchema = FormTournamentSchema.partial()

export type FormTournamentData = z.infer<typeof FormTournamentSchema>
export type UpdateTournamentData = z.infer<typeof UpdateTournamentSchema>
