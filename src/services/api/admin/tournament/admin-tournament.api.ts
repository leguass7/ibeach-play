import { apiService } from '@/services/api/api.service'
import type { FormTournamentData, IResponseTournament } from '@/services/api/tournament'

export function adminGetTournamentList(): Promise<IResponseTournament | null> {
  return apiService.get(`/admin/tournament`)
}

export function adminGetTournament(classroomId: number): Promise<IResponseTournament | null> {
  return apiService.get(`/admin/tournament/${classroomId}`)
}

export function adminCreateTournament(data: FormTournamentData): Promise<IResponseTournament | null> {
  return apiService.post('/admin/tournament', data)
}

export function adminUpdateTournament(classroomId: number, data: Partial<FormTournamentData>): Promise<IResponseTournament | null> {
  return apiService.patch(`/admin/tournament/${classroomId}`, data)
}

export type StoreTournamentParams = FormTournamentData & { id?: number }
export function adminStoreTournament({ id, ...data }: StoreTournamentParams): Promise<IResponseTournament | null> {
  if (id) return adminUpdateTournament(id, data)
  return adminCreateTournament(data)
}

export function adminDeleteTournament(id: number): Promise<IResponseTournament | null> {
  return apiService.delete(`/admin/tournament/${id}`)
}
