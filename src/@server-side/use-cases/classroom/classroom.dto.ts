import { Transform, Type } from 'class-transformer'
import { IsArray, IsDate, IsInt, IsOptional, IsString, Length, Max, Min } from 'class-validator'

export class ClassroomDTO {
  id: number
  label?: string
  arenaId: number
  coachId: number

  createdAt?: Date
  updatedAt?: Date
  //
  hours?: ClassroomHourDTO[]
}

export class ClassroomHourDTO {
  @IsOptional()
  @IsString()
  id?: string

  @IsInt()
  classroomId?: number

  @IsInt()
  @Min(0)
  @Max(6)
  @Transform(({ value }) => Number(value))
  weekDay: number

  @IsDate()
  startHour: string | Date
}

export class CreateClassroomDTO {
  @Length(0, 255)
  @IsOptional()
  label?: string

  @Transform(({ value, ...rest }) => {
    console.log('Transforming coachId', value, rest)
    return Number(value)
  })
  @IsInt()
  arenaId: number

  @Transform(({ value, ...rest }) => {
    console.log('Transforming coachId', value, rest)
    return Number(value)
  })
  @IsInt()
  @IsOptional()
  coachId: number

  @IsOptional()
  createdAt?: Date

  @IsOptional()
  updatedAt?: Date

  @IsArray()
  @Type(() => ClassroomHourDTO)
  hours: ClassroomHourDTO[]
}

export class UpdateClassroomDTO {
  @IsInt()
  @Transform(({ value }) => Number(value))
  arenaId?: number

  @Length(0, 255)
  @IsOptional()
  label?: string

  @IsArray()
  @IsOptional()
  hours?: ClassroomHourDTO[]
}
