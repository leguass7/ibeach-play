'use client'
import { createContext, useContext, useState, type ReactNode } from 'react'

import useFetcher from '@/hooks/useFetcher'
import { useOnceCall } from '@/hooks/useOnceCall'
import { generateTournamentBracket, paginatedBracketRounds, updateTournamentMatchScore } from '@/services/api/tournament/bracket'
import type { IBracketRound } from '@/services/api/tournament/bracket/bracket.interface'
import {
  addTournamentPair,
  clearTournamentPairs,
  deleteTournamentPair,
  generateTournamentPairs,
  paginatedTournamentPair
} from '@/services/api/tournament/pair'
import type { IPair } from '@/services/api/tournament/pair/pair.interface'
import { importPerson, paginateTournamentPerson, registerPerson, updatePerson } from '@/services/api/tournament/person'
import type { IPerson } from '@/services/api/tournament/person/person.interface'

interface TournamentContextType {
  // Pessoas
  people: IPerson[]
  fetchPeople: () => Promise<IPerson[]>
  addPerson: (person: Omit<IPerson, 'id'>) => Promise<IPerson>
  updatePerson: (id: string, person: Partial<IPerson>) => Promise<IPerson>
  deletePerson: (id: string) => Promise<void>
  importPeople: (people: Omit<IPerson, 'id'>[]) => Promise<IPerson[]>

  // Pares
  pairs: IPair[]
  fetchPairs: () => Promise<IPair[]>
  generatePairs: (method: string) => Promise<IPair[]>
  addPair: (person1Id: string, person2Id: string) => Promise<IPair>
  deletePair: (id: string) => Promise<void>
  clearPairs: () => Promise<void>

  // Torneios
  bracketRounds: IBracketRound[]
  fetchBracketRounds: () => Promise<IBracketRound[]>
  generateBracket: (size: number) => Promise<IBracketRound[]>
  updateMatchScore: (roundIndex: number, matchIndex: number, score1: number, score2: number) => Promise<IBracketRound[]>

  // Estados de carregamento
  loading: {
    people: boolean
    pairs: boolean
    brackets: boolean
  }
}

const TournamentContext = createContext<TournamentContextType | undefined>(undefined)

export function TournamentStageProvider({ children }: { children: ReactNode }) {
  const [people, setPeople] = useState<IPerson[]>([])
  const [pairs, setPairs] = useState<IPair[]>([])
  const [bracketRounds, setBracketRounds] = useState<IBracketRound[]>([])

  // Hooks fetcher
  const [fetchPeoples, loadingPeoples] = useFetcher(async () => {
    const data = await paginateTournamentPerson()
    const persons = data?.persons || []
    setPeople(persons)
    return persons
  })
  const [fetchPairs, loadingPairs] = useFetcher(async () => {
    const data = await paginatedTournamentPair()
    const pairs = data?.pairs || []
    setPairs(pairs)
    return pairs
  })
  const [fetchBracketRounds, loadingBracketRounds] = useFetcher(async () => {
    const data = await paginatedBracketRounds()
    const rounds = data?.rounds || []
    setBracketRounds(rounds)
    return rounds
  })

  // Manipulação de pessoas
  const addPerson = async (person: Omit<IPerson, 'id'>): Promise<IPerson> => {
    const newPerson = await registerPerson(person)
    if (newPerson) {
      setPeople(prev => [...prev, ...(newPerson?.person ? [newPerson?.person] : [])])
    }

    if (!newPerson?.person) {
      throw new Error('Failed to add person: person data is undefined')
    }
    return newPerson?.person
  }

  const editPerson = async (id: string, person: Partial<IPerson>): Promise<IPerson> => {
    const updatedPerson = await updatePerson(id, person)
    if (updatedPerson?.person) {
      setPeople(prev => prev.map(p => (p.id === id && updatedPerson.person ? updatedPerson.person : p)))
    }
    if (!updatedPerson?.person) {
      throw new Error('Failed to update person: person data is undefined')
    }
    return updatedPerson.person
  }

  const deletePerson = async (id: string): Promise<void> => {
    await deletePerson(id)
    setPeople(prev => prev.filter(p => p.id !== id))
  }

  const importPeople = async (peopleToImport: Omit<IPerson, 'id'>[]): Promise<IPerson[]> => {
    const importedPeople = await importPerson(peopleToImport)
    if (importedPeople?.persons) {
      setPeople(prev => [...prev, ...importedPeople?.persons])
    }

    return importedPeople?.persons || []
  }

  // Manipulação de pares
  const generatePairs = async (method: string): Promise<IPair[]> => {
    const data = await generateTournamentPairs(method)
    if (data?.pairs) {
      setPairs(data?.pairs || [])
    }

    return data?.pairs || []
  }

  const addPair = async (person1Id: string, person2Id: string): Promise<IPair> => {
    const newPair = await addTournamentPair(person1Id, person2Id)
    if (newPair?.pair) {
      setPairs(prev => [...prev, ...(newPair.pair ? [newPair.pair] : [])])
    }
    if (!newPair?.pair) {
      throw new Error('Failed to add pair: pair data is undefined or null')
    }
    return newPair.pair
  }

  const deletePair = async (id: string): Promise<void> => {
    await deleteTournamentPair(id)
    setPairs(prev => prev.filter(pair => pair.id !== id))
  }

  const clearPairs = async (): Promise<void> => {
    await clearTournamentPairs()
    setPairs([])
  }

  // Manipulação de torneios
  const generateBracket = async (size: number): Promise<IBracketRound[]> => {
    const data = await generateTournamentBracket(size)
    if (data?.rounds) {
      setBracketRounds(data?.rounds || [])
    }

    return data?.rounds || []
  }

  const updateMatchScore = async (roundIndex: number, matchIndex: number, score1: number, score2: number): Promise<IBracketRound[]> => {
    const data = await updateTournamentMatchScore(roundIndex, matchIndex, score1, score2)
    if (data?.rounds) {
      setBracketRounds(data?.rounds || [])
    }
    return data?.rounds || []
  }

  // Inicializar dados
  useOnceCall(fetchPeoples)
  useOnceCall(fetchPairs)
  useOnceCall(fetchBracketRounds)

  const value = {
    people,
    fetchPeople: fetchPeoples,
    addPerson,
    updatePerson: editPerson,
    deletePerson,
    importPeople,
    pairs,
    fetchPairs,
    generatePairs,
    addPair,
    deletePair,
    clearPairs,
    bracketRounds,
    fetchBracketRounds,
    generateBracket,
    updateMatchScore,
    loading: {
      people: loadingPeoples,
      pairs: loadingPairs,
      brackets: loadingBracketRounds
    }
  }

  return <TournamentContext.Provider value={value}>{children}</TournamentContext.Provider>
}

export function useTournamentStageProvider() {
  const context = useContext(TournamentContext)
  if (context === undefined) {
    throw new Error('useTournament must be used within an ApiProvider')
  }
  return context
}
