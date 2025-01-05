import * as z from 'zod'

const ClassroomHourSchema = z.object({
  weekDay: z.number().min(0, { message: 'Dia inválido' }).max(6, { message: 'Dia inválido' }),
  startHour: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'Horário inválido (formato: HH:MM)'
  })
})

export const FormClassroomSchema = z.object({
  label: z.string().min(3, { message: 'Nome precisa ter no mínimo 3 caracteres' }).max(255, { message: 'Nome muito longo' }),
  arenaId: z.number({
    required_error: 'Arena é obrigatória',
    invalid_type_error: 'Arena inválida'
  }),
  hours: z
    .array(ClassroomHourSchema)
    .min(1, { message: 'Adicione pelo menos um horário' })
    .refine(
      hours => {
        // Verifica se não existem horários duplicados
        const uniqueHours = new Set(hours.map(h => `${h.weekDay}-${h.startHour}`))
        return uniqueHours.size === hours.length
      },
      { message: 'Existem horários duplicados' }
    )
})

export const UpdateClassroomSchema = FormClassroomSchema.partial()

export type FormClassroomData = z.infer<typeof FormClassroomSchema>
export type UpdateClassroomData = z.infer<typeof UpdateClassroomSchema>
