import { apiService } from '@/services/api/api.service'
import type { ITeamResponse, FormTeamData, UpdateTeamData } from '@/services/api/team'

export function paginateTeam(): Promise<ITeamResponse | null> {
  return apiService.get('/admin/team')
}

// Add a new team
export function createTeam(data: FormTeamData): Promise<ITeamResponse | null> {
  return apiService.post('/admin/team', data)
}

// Update an existing team
export function updateTeam(id: string, data: UpdateTeamData): Promise<ITeamResponse | null> {
  return apiService.patch(`/admin/team/${id}`, data)
}

// Delete a team
export function deleteTeam(id: string): Promise<ITeamResponse | null> {
  return apiService.delete(`/admin/team/${id}`)
}

//Delete all teams
export function deleteAllTeams(): Promise<ITeamResponse | null> {
  return apiService.delete(`/admin/team/clear`)
}
