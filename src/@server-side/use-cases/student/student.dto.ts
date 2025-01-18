import { Transform } from 'class-transformer'
import { IsInt, IsOptional } from 'class-validator'

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
