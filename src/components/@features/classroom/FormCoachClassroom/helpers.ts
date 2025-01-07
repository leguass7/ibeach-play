import type { ClassroomDTO, ClassroomHourDTO } from '@/@server-side/use-cases/classroom'
import type { FormClassroomData } from '@/services/api/classroom'
import type { StoreClassroomParams } from '@/services/api/coach'

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

type Params = FormClassroomData['hours'] | ClassroomHourDTO[]
export function hoursToFormArray(hours: Params = []): FormClassroomData['hours'] {
  if (!hours.length) {
    const id = `${Math.random().toString(36).substring(7)}`
    return [{ weekDay: 1, startHour: '08:00', id }] as FormClassroomData['hours']
  }
  return hours.map(h => ({ weekDay: +h?.weekDay || 1, startHour: h.startHour, id: h?.id })) as FormClassroomData['hours']
}

export function formClassroomOutDto(data: FormClassroomData, id?: number): StoreClassroomParams {
  return {
    id: id || data?.id,
    label: data.label,
    arenaId: Number(data?.arenaId || 0),
    hours: hoursToFormArray(data.hours)
  }
}

export function formClassroomInDto(data?: ClassroomDTO): FormClassroomData | undefined {
  if (!data) return undefined
  const { id, label, arenaId, hours } = data
  return {
    id,
    label: label || '--',
    arenaId,
    hours: hours?.length ? hoursToFormArray(hours) : []
  }
}
