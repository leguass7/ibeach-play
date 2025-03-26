import * as z from 'zod'

export const FormTournamentStageSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(3, { message: 'Nome precisa ter no mínimo 3 caracteres' }).max(255, { message: 'Nome muito longo' }),
  tournamentId: z.number().optional(),
  arenaId: z.number(),
  date: z.date()
})

export const UpdateTournamentStageSchema = FormTournamentStageSchema.partial()

export type FormTournamentStageData = z.infer<typeof FormTournamentStageSchema>
export type UpdateTournamentStageData = z.infer<typeof UpdateTournamentStageSchema>
