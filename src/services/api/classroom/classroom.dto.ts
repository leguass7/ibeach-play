import type { ClassroomDTO } from '@/@server-side/use-cases/classroom'
import { createZodDto } from '@/lib/zod-validation-pipe/createZodDto'
import type { ResponseApi } from '@/services/ClientAxios'

import { UpdateClassroomSchema } from './classroom.validation'

export class UpdateClassroomDto extends createZodDto(UpdateClassroomSchema) {}

export type IResponseClassroom = ResponseApi<{ classroom: ClassroomDTO; classroomId: number; classrooms: ClassroomDTO[] }>
