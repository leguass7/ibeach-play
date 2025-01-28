import { formatHour } from '@/helpers/date'
import type { FormClassroomData } from '@/services/api/classroom'
import type { StoreClassroomParams } from '@/services/api/coach'

import type { ClassroomDTO } from '~/use-cases/classroom'

export const weekDays = [
  { value: 0, label: 'Domingo' },
  { value: 1, label: 'Segunda' },
  { value: 2, label: 'Terça' },
  { value: 3, label: 'Quarta' },
  { value: 4, label: 'Quinta' },
  { value: 5, label: 'Sexta' },
  { value: 6, label: 'Sábado' }
]

export type FormArrayHours = { weekDay: number; startHour: string | Date; classroomId?: number }[]

type Params = FormClassroomData['hours']
export function hoursToFormArray(hours: Params = []): FormClassroomData['hours'] {
  if (!hours?.length) {
    const id = `${Math.random().toString(36).substring(7)}`
    return [{ weekDay: 1, startHour: '08:00', id }]
  }

  return hours.map(hour => ({
    id: hour?.id || `${Math.random().toString(36).substring(7)}`,
    weekDay: hour.weekDay,
    startHour: hour.startHour as string
  }))
}

export function formClassroomOutDto(data: FormClassroomData, classroomId?: number): StoreClassroomParams {
  const id = classroomId && classroomId > 0 ? classroomId : data?.id
  return {
    id,
    label: data.label,
    arenaId: Number(data?.arenaId || 0),
    hours: hoursToFormArray(data.hours)
  }
}

export function formClassroomInDto(data?: ClassroomDTO): FormClassroomData | undefined {
  if (!data) return undefined
  const { id, label, arenaId, hours = [] } = data

  const hDto = () =>
    hours.map(hour => {
      const startHour = formatHour(hour?.startHour) || '08:00'
      return { weekDay: hour.weekDay, startHour, id: hour.id }
    })

  return {
    id,
    label: label || '',
    arenaId: arenaId || 0,
    hours: hDto()
  } as FormClassroomData
}
