import type { ClassroomHours } from '@prisma/client'
import { Transform } from 'class-transformer'
import { IsDate, IsInt, IsOptional, IsString, Max, Min } from 'class-validator'

export type ClassroomHoursDTO = Partial<ClassroomHours>
// export class ClassroomDTO {
//   id: number
//   label?: string
//   arenaId: number
//   coachId: number

//   createdAt?: Date
//   updatedAt?: Date
//   //
//   hours?: ClassroomHourDTO[]
// }

export class CreateClassroomHourDTO {
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
