import type { Student } from '@prisma/client'
import { Transform } from 'class-transformer'
import { IsInt, IsOptional } from 'class-validator'

import type { ClassroomDTO } from '../classroom'
import type { UserDTO } from '../user'

export type StudentDTO = Partial<Student> & {
  student?: UserDTO
  classroom?: ClassroomDTO
}

// export type StudentDTO = {
//   classroomId: number
//   studentId: number
//   createdAt: Date
//   student?: Partial<UserDTO>
//   classroom?: Partial<ClassroomDTO>
// }

export class CreateStudentDTO {
  // id?: string
  @Transform(({ value }) => Number(value))
  @IsInt()
  classroomId: number

  @Transform(({ value }) => Number(value))
  @IsInt()
  studentId: number

  @IsOptional()
  createdAt?: Date

  @IsOptional()
  updatedAt?: Date
}
