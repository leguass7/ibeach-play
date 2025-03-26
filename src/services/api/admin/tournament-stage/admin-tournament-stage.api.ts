import { apiService } from '@/services/api/api.service'
import type { FormTournamentStageData, IResponseTournamentStage } from '@/services/api/tournament-stage'

export async function adminGetTournamentStageList(tournamentId?: number | null): Promise<IResponseTournamentStage | null> {
  if (!tournamentId) return null
  return apiService.get(`/admin/tournament-stage`, { params: { tournamentId } })
}

export function adminGetTournamentStage(tournamentId: number): Promise<IResponseTournamentStage | null> {
  return apiService.get(`/admin/tournament-stage`, { params: { tournamentId } })
}

export function adminCreateTournamentStage(data: FormTournamentStageData): Promise<IResponseTournamentStage | null> {
  return apiService.post('/admin/tournament-stage', data)
}

export function adminUpdateTournamentStage(stageId: number, data: Partial<FormTournamentStageData>): Promise<IResponseTournamentStage | null> {
  return apiService.patch(`/admin/tournament-stage/${stageId}`, data)
}

export type StoreTournamentStageParams = FormTournamentStageData & { id?: number }
export function adminStoreTournamentStage({ id, ...data }: StoreTournamentStageParams): Promise<IResponseTournamentStage | null> {
  if (id) return adminUpdateTournamentStage(id, data)
  return adminCreateTournamentStage(data)
}

export function adminDeleteTournamentStage(stageId: number): Promise<IResponseTournamentStage | null> {
  return apiService.delete(`/admin/tournament-stage/${stageId}`)
}
