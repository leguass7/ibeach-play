/* eslint-disable @typescript-eslint/no-explicit-any */
import { tryDate } from '@/helpers/date'

import type { CreateClassroomHourDTO, ClassroomHoursDTO } from '../classroom-hour/classroom-hour.dto'

export function hoursDto(data: CreateClassroomHourDTO | ClassroomHoursDTO): CreateClassroomHourDTO
export function hoursDto(data: CreateClassroomHourDTO[] | ClassroomHoursDTO[]): CreateClassroomHourDTO[]
export function hoursDto(data: any): any {
  console.log('hoursDto', data)
  if (Array.isArray(data)) return data.map(h => hoursDto(h))

  const { weekDay, startHour, classroomId } = data
  const result: CreateClassroomHourDTO = {
    weekDay,
    classroomId,
    startHour: tryDate(startHour, ['HH:mm']) || new Date('1970-01-01 08:00:00')
  }
  console.log('result', result)
  return result
}
