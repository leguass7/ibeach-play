/* eslint-disable @typescript-eslint/no-explicit-any */
import { tryDate } from '@/helpers/date'

import type { ClassroomHourDTO } from './classroom.dto'

export function hoursDto(data: ClassroomHourDTO): ClassroomHourDTO
export function hoursDto(data: ClassroomHourDTO[]): ClassroomHourDTO[]
export function hoursDto(data: any): any {
  if (Array.isArray(data)) return data.map(h => hoursDto(h))
  const { weekDay, startHour, classroomId } = data
  return {
    weekDay,
    classroomId,
    startHour: tryDate(startHour, ['HH:mm']) || new Date('1970-01-01 08:00:00')
  }
}
