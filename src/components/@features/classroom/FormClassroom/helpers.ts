import type { ClassroomHourDTO } from '@/@server-side/use-cases/classroom'

export const weekDays = [
  { value: 0, label: 'Domingo' },
  { value: 1, label: 'Segunda' },
  { value: 2, label: 'Terça' },
  { value: 3, label: 'Quarta' },
  { value: 4, label: 'Quinta' },
  { value: 5, label: 'Sexta' },
  { value: 6, label: 'Sábado' }
]

export type FormArrayHours = { weekDay: number; startHour: string }[]

export function hoursToFormArray(hours: ClassroomHourDTO[] = []): { weekDay: number; startHour: string }[] {
  if (!hours.length) return [{ weekDay: 1, startHour: '08:00' }]
  return hours.map(h => ({
    weekDay: h.weekDay,
    startHour: h.startHour
  }))
}
