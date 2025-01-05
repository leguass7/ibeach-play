import { IsInt, IsOptional, Length } from 'class-validator'

export class ClassroomDTO {
  id: number
  label?: string
  arenaId: number
  coachId: number

  createdAt?: Date
  updatedAt?: Date
}

export class CreateClassroomDTO {
  @Length(0, 255)
  @IsOptional()
  label?: string

  @IsInt()
  arenaId: number

  @IsInt()
  coachId: number

  @IsOptional()
  createdAt?: Date

  @IsOptional()
  updatedAt?: Date
}
