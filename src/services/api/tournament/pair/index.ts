import { apiService } from '../../api.service'
import type { ITournamentPaginatedPairResponse, ITournamentPairResponse } from './pair.interface'

// Fetch all pairs
export function paginatedTournamentPair(): Promise<ITournamentPaginatedPairResponse | null> {
  return apiService.get('/tournament/pairs')
}

// Generate pairs with a specified method
export function generateTournamentPairs(method: string): Promise<ITournamentPaginatedPairResponse | null> {
  return apiService.post('/tournament/pairs/generate', { method })
}

// Add a new pair
export function addTournamentPair(person1Id: string, person2Id: string): Promise<ITournamentPairResponse | null> {
  return apiService.post('/tournament/pairs', { person1Id, person2Id })
}

// Delete a specific pair
export function deleteTournamentPair(id: string): Promise<ITournamentPairResponse | null> {
  return apiService.delete(`/tournament/pairs/${id}`)
}

// Clear all pairs
export function clearTournamentPairs(): Promise<ITournamentPairResponse | null> {
  return apiService.delete('/tournament/pairs/clear')
}
