import * as z from 'zod'

export const FormTeamSchema = z.object({
  id: z.string().uuid().optional(),
  stageId: z.number(),
  playerAId: z.string().uuid(),
  playerBId: z.string().uuid(),
  groupId: z.string().uuid().optional(),
  createdAt: z.date().optional()
})

export const UpdateTeamSchema = FormTeamSchema.partial()

export type FormTeamData = z.infer<typeof FormTeamSchema>
export type UpdateTeamData = z.infer<typeof UpdateTeamSchema>
