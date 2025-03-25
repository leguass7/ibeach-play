import { apiService } from '../../api.service'
import { type ITournamentPaginatedBracketRoundResponse } from './bracket.interface'

// Fetch all bracket rounds
export function paginatedBracketRounds(): Promise<ITournamentPaginatedBracketRoundResponse | null> {
  return apiService.get('/tournament/brackets')
}

// Generate a bracket with a specified size
export function generateTournamentBracket(size: number): Promise<ITournamentPaginatedBracketRoundResponse | null> {
  return apiService.post('/tournament/brackets/generate', { size })
}

// Update match score
export function updateTournamentMatchScore(
  roundIndex: number,
  matchIndex: number,
  score1: number,
  score2: number
): Promise<ITournamentPaginatedBracketRoundResponse | null> {
  return apiService.patch('/tournament/brackets/update-score', { roundIndex, matchIndex, score1, score2 })
}
