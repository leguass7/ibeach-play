import { IsInt, IsOptional, Length, IsArray, IsNumber, Min, Max } from 'class-validator'

export class ClassroomDTO {
  id: number
  label?: string
  arenaId: number
  coachId: number

  createdAt?: Date
  updatedAt?: Date
}

export class ClassroomHourDTO {
  @IsInt()
  @Min(0)
  @Max(6)
  weekDay: number

  @IsNumber()
  startHour: Date
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

  @IsArray()
  hours: ClassroomHourDTO[]
}

export class UpdateClassroomDTO {
  @Length(0, 255)
  @IsOptional()
  label?: string

  @IsArray()
  @IsOptional()
  hours?: ClassroomHourDTO[]
}
