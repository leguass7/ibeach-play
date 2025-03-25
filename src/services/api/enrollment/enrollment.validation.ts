import * as z from 'zod'

export const FormEnrollmentSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(3, { message: 'Nome precisa ter no mínimo 3 caracteres' }).max(255, { message: 'Nome muito longo' }),
  stageId: z.number(),
  userId: z.number().optional(),
  weight: z.number().optional()
})

export const UpdateEnrollmentSchema = FormEnrollmentSchema.partial()

export type FormEnrollmentData = z.infer<typeof FormEnrollmentSchema>
export type UpdateEnrollmentData = z.infer<typeof UpdateEnrollmentSchema>
