import type { ClassroomDTO } from '@/@server-side/use-cases/classroom'
import type { ResponseApi } from '@/services/ClientAxios'

import type { IUser } from '../user/user.interface'

export interface IStudent {
  id: string
  classroomId: number
  studentId: number
  createdAt: Date
  student?: IUser
  classroom?: ClassroomDTO
}

export type IStudentResponse = ResponseApi<{
  student?: IStudent
  students?: IStudent[]
}>
