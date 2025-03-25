import { apiService } from '../../api.service'
import type { IPerson, ITournamentPaginatedPersonResponse, ITournamentPersonResponse } from './person.interface'

export function paginateTournamentPerson(): Promise<ITournamentPaginatedPersonResponse | null> {
  return apiService.get('/tournament/person')
}

export function getUser(userId: number) {
  return apiService.get(`/admin/user/${userId}`)
}

// Add a new person
export function registerPerson(person: Omit<IPerson, 'id'>): Promise<ITournamentPersonResponse | null> {
  return apiService.post('/tournament/person', person)
}

// Update an existing person
export function updatePerson(id: string, person: Partial<IPerson>): Promise<ITournamentPersonResponse | null> {
  return apiService.patch(`/tournament/person/${id}`, person)
}

// Delete a person
export function deletePerson(id: string): Promise<ITournamentPersonResponse | null> {
  return apiService.delete(`/tournament/person/${id}`)
}

// Import multiple people
export function importPerson(person: Omit<IPerson, 'id'>[]): Promise<ITournamentPaginatedPersonResponse | null> {
  return apiService.post('/tournament/person/import', person)
}
