import type { Classroom } from '@prisma/client'
import { Transform, Type } from 'class-transformer'
import { IsArray, IsInt, IsOptional, Length } from 'class-validator'

import { type ClassroomHoursDTO, CreateClassroomHourDTO } from '../classroom-hour/classroom-hour.dto'

export type ClassroomDTO = Partial<Classroom> & { hours?: ClassroomHoursDTO[] }

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
  @Type(() => CreateClassroomHourDTO)
  hours: ClassroomHoursDTO[]
}

export class UpdateClassroomDTO {
  @IsInt()
  @Transform(({ value }) => Number(value))
  arenaId?: number

  @Length(0, 255)
  @IsOptional()
  label?: string

  @IsArray()
  @Type(() => CreateClassroomHourDTO)
  @IsOptional()
  hours?: ClassroomHoursDTO[]
}
