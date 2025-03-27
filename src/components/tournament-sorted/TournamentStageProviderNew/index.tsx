'use client'
import { createContext, useContext, useState, type ReactNode } from 'react'

import useFetcher from '@/hooks/useFetcher'
import { useOnceCall } from '@/hooks/useOnceCall'
import { createTeam, paginateTeam } from '@/services/api/admin/team/admin-team.api'
import {
  createEnrollment,
  deleteEnrollment,
  importEnrollment,
  paginateEnrollment,
  updateEnrollment,
  type FormEnrollmentData,
  type UpdateEnrollmentData
} from '@/services/api/enrollment'
import type { ITeamResponse } from '@/services/api/team'

import type { EnrollmentDTO } from '~/use-cases/enrollment'
import type { TeamDTO } from '~/use-cases/team'

import { createManualTeam, generateBalancedTeams, generateRandomTeams } from './helper/team-genarete'

interface TournamentContextType {
  // Pessoas
  enrollments: EnrollmentDTO[]
  fetchEnrollments: () => Promise<EnrollmentDTO[]>
  addEnrollment: (person: FormEnrollmentData) => Promise<EnrollmentDTO>
  editEnrollment: (id: string, person: UpdateEnrollmentData) => Promise<EnrollmentDTO>
  deleteEnrollment: (id: string) => Promise<void>
  importEnrollments: (persons: FormEnrollmentData[]) => Promise<EnrollmentDTO[]>

  //Duplas
  teams: TeamDTO[]
  fetchTeams: () => Promise<TeamDTO[]>
  onGenerateAndSaveBalancedTeams: () => Promise<void>
  onGenerateAndSaveRandomTeams: () => Promise<void>
  onCreateAndSaveManualTeam: (playerAId: string, playerBId: string) => Promise<TeamDTO | null>

  // Estados de carregamento
  loading: {
    enrollments: boolean
  }
}

const TournamentContext = createContext<TournamentContextType | undefined>(undefined)

export function TournamentStageProvider({ children }: { children: ReactNode }) {
  const [enrollments, setEnrollment] = useState<EnrollmentDTO[]>([])
  const [teams, setTeams] = useState<TeamDTO[]>([])

  // Hooks fetcher
  const [fetchEnrollments, loadingEnrollments] = useFetcher(async () => {
    const data = await paginateEnrollment()
    const enrollments = data?.enrollments || []
    setEnrollment(enrollments)
    return enrollments
  })

  const [fetchTeams, loadingTeams] = useFetcher(async () => {
    const data = await paginateTeam()
    const teams = data?.teams || []
    setTeams(teams)
    return teams
  })

  // Manipulação de pessoas
  const addEnrollment = async (person: FormEnrollmentData): Promise<EnrollmentDTO> => {
    const newEnrolled = await createEnrollment(person)
    if (newEnrolled) {
      setEnrollment(prev => [...prev, ...(newEnrolled?.enrollment ? [newEnrolled?.enrollment] : [])])
    }

    if (!newEnrolled?.enrollment) {
      throw new Error('Failed to add person: person data is undefined')
    }
    return newEnrolled?.enrollment
  }

  const editEnrollment = async (id: string, person: UpdateEnrollmentData): Promise<EnrollmentDTO> => {
    const enrollmentUpdate = await updateEnrollment(id, person)
    if (enrollmentUpdate?.enrollment) {
      setEnrollment(prev => prev.map(p => (p.id === id && enrollmentUpdate?.enrollment ? enrollmentUpdate?.enrollment : p)))
    }
    if (!enrollmentUpdate?.enrollment) {
      throw new Error('Failed to update person: person data is undefined')
    }
    return enrollmentUpdate?.enrollment
  }

  const deleteEnrollmentPerson = async (id: string): Promise<void> => {
    await deleteEnrollment(id)
    setEnrollment(prev => prev.filter(p => p.id !== id))
  }

  const importEnrollments = async (peopleToImport: FormEnrollmentData[]): Promise<EnrollmentDTO[]> => {
    const importedEnrollments = await importEnrollment(peopleToImport)
    if (importedEnrollments?.enrollments) {
      setEnrollment(prev => [...prev, ...importedEnrollments?.enrollments])
    }

    return importedEnrollments?.enrollments || []
  }

  //Manipulação de duplas
  const generateAndSaveBalancedTeams = async (): Promise<void> => {
    if (enrollments.length < 2) return

    const newTeams = generateBalancedTeams(enrollments)
    const createdTeams = await Promise.all(
      newTeams?.map(team =>
        createTeam({
          stageId: team?.stageId ?? 0,
          playerAId: team?.playerAId,
          playerBId: team?.playerBId
        })
      )
    )

    setTeams(prev => [
      ...prev,
      ...createdTeams
        .filter((teamResponse): teamResponse is ITeamResponse => teamResponse !== null)
        .map(teamResponse => ({
          id: teamResponse?.team?.id,
          playerAId: teamResponse?.team?.playerAId,
          playerBId: teamResponse?.team?.playerBId,
          stageId: teamResponse?.team?.stageId
        }))
    ])
  }

  const generateAndSaveRandomTeams = async (): Promise<void> => {
    if (enrollments.length < 2) return

    const newTeams = generateRandomTeams(enrollments)
    const createdTeams = await Promise.all(
      newTeams?.map(team =>
        createTeam({
          stageId: team?.stageId ?? 0,
          playerAId: team?.playerAId,
          playerBId: team?.playerBId
        })
      )
    )

    setTeams(prev => [
      ...prev,
      ...createdTeams
        .filter((teamResponse): teamResponse is ITeamResponse => teamResponse !== null)
        .map(teamResponse => ({
          id: teamResponse?.team?.id,
          playerAId: teamResponse?.team?.playerAId,
          playerBId: teamResponse?.team?.playerBId,
          stageId: teamResponse?.team?.stageId
        }))
    ])
  }

  const createAndSaveManualTeam = async (playerAId: string, playerBId: string): Promise<TeamDTO | null> => {
    const newTeam = createManualTeam(enrollments, playerAId, playerBId)
    if (!newTeam) return null

    const response = await createTeam({
      stageId: newTeam.stageId ?? 0,
      playerAId: newTeam.playerAId,
      playerBId: newTeam.playerBId
    })

    if (response?.team) {
      setTeams(prev => [...prev, response?.team])
    }

    return response?.team ?? null
  }

  // Inicializar dados
  useOnceCall(fetchEnrollments)
  useOnceCall(fetchTeams)

  const value = {
    enrollments,
    fetchEnrollments,
    addEnrollment,
    editEnrollment,
    deleteEnrollment: deleteEnrollmentPerson,
    importEnrollments,

    teams,
    fetchTeams,
    onGenerateAndSaveBalancedTeams: generateAndSaveBalancedTeams,
    onGenerateAndSaveRandomTeams: generateAndSaveRandomTeams,
    onCreateAndSaveManualTeam: createAndSaveManualTeam,

    loading: {
      enrollments: loadingEnrollments
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
