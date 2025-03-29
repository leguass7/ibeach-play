'use client'
import { createContext, useContext, useState, type ReactNode } from 'react'

import useFetcher from '@/hooks/useFetcher'
import { useOnceCall } from '@/hooks/useOnceCall'
import { createTeam, deleteAllTeams, deleteTeam, paginateTeam } from '@/services/api/admin/team/admin-team.api'
import {
  createEnrollment,
  deleteEnrollment,
  getOneEnrollment,
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

type TournamentStageProviderProps = {
  children: ReactNode
  stageId: number
  tournamentId: number
}

interface TournamentContextType {
  // Pessoas
  enrollments: EnrollmentDTO[]
  enrollment: EnrollmentDTO | null
  fetchEnrollments: () => Promise<EnrollmentDTO[]>
  addEnrollment: (person: FormEnrollmentData) => Promise<EnrollmentDTO>
  editEnrollment: (id: string, person: UpdateEnrollmentData) => Promise<EnrollmentDTO>
  deleteEnrollment: (id: string) => Promise<void>
  importEnrollments: (persons: FormEnrollmentData[]) => Promise<EnrollmentDTO[]>
  requestEnrollment: (id: string) => Promise<EnrollmentDTO>

  //Duplas
  teams: TeamDTO[]
  fetchTeams: () => Promise<TeamDTO[]>
  onGenerateAndSaveBalancedTeams: () => Promise<void>
  onGenerateAndSaveRandomTeams: () => Promise<void>
  onCreateAndSaveManualTeam: (playerAId: string, playerBId: string) => Promise<TeamDTO | null>
  onDeleteOneTeam: (id: string) => Promise<void>
  onClearAllTeams: () => Promise<void>

  // Estados de carregamento
  loading: {
    enrollment: boolean
    enrollments: boolean
    teams: boolean
  }
}

const TournamentContext = createContext<TournamentContextType | undefined>(undefined)

export function TournamentStageProvider({ children, stageId, tournamentId }: TournamentStageProviderProps) {
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

  const [requestEnrollment, loadingRequestEnrollment, responseDataRequestEnrollment] = useFetcher(async (id: string) => {
    const response = await getOneEnrollment(id)
    if (!response || !response?.enrollment) {
      throw new Error('Failed to fetch enrollment: enrollment data is undefined')
    }
    return response.enrollment
  })

  // Manipulação de pessoas
  const addEnrollment = async (person: FormEnrollmentData): Promise<EnrollmentDTO> => {
    const newEnrolled = await createEnrollment({ ...person, stageId })
    if (newEnrolled?.enrollment) {
      setEnrollment(prev => [...prev, newEnrolled.enrollment])
      return newEnrolled.enrollment
    }
    throw new Error('Failed to add person: person data is undefined')
  }

  const editEnrollment = async (id: string, person: UpdateEnrollmentData): Promise<EnrollmentDTO> => {
    const enrollmentUpdate = await updateEnrollment(id, { ...person, stageId })
    if (enrollmentUpdate?.enrollment) {
      setEnrollment(prev => prev.map(p => (p.id === id ? enrollmentUpdate.enrollment : p)))
      return enrollmentUpdate.enrollment
    }
    throw new Error('Failed to update person: person data is undefined')
  }

  const deleteEnrollmentPerson = async (id: string): Promise<void> => {
    await deleteEnrollment(id)
    setEnrollment(prev => prev.filter(p => p.id !== id))
  }

  const importEnrollments = async (peopleToImport: FormEnrollmentData[]): Promise<EnrollmentDTO[]> => {
    const importedEnrollments = await importEnrollment(
      peopleToImport.map(person => ({ ...person, stageId })) // Adicionando stageId automaticamente para cada pessoa importada
    )
    if (importedEnrollments?.enrollments) {
      setEnrollment(prev => [...prev, ...importedEnrollments.enrollments])
      return importedEnrollments.enrollments
    }
    return []
  }

  //Manipulação de duplas
  const generateAndSaveBalancedTeams = async (): Promise<void> => {
    if (enrollments.length < 2) return

    const newTeams = generateBalancedTeams(enrollments)
    const createdTeams = await Promise.all(
      newTeams?.map(team =>
        createTeam({
          stageId,
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
          stageId,
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
      stageId,
      playerAId: newTeam.playerAId,
      playerBId: newTeam.playerBId
    })

    if (response?.team) {
      setTeams(prev => [...prev, response?.team])
    }

    return response?.team ?? null
  }

  const deleteOneTeam = async (id: string): Promise<void> => {
    await deleteTeam(id)
    setTeams(prev => prev.filter(team => team?.id !== id))
  }

  const clearAllTeams = async (): Promise<void> => {
    await deleteAllTeams()
    setTeams([])
  }

  // Inicializar dados
  useOnceCall(fetchEnrollments)
  useOnceCall(fetchTeams)

  const value = {
    enrollments,
    enrollment: responseDataRequestEnrollment,
    fetchEnrollments,
    addEnrollment,
    editEnrollment,
    deleteEnrollment: deleteEnrollmentPerson,
    importEnrollments,
    requestEnrollment,

    teams,
    fetchTeams,
    onGenerateAndSaveBalancedTeams: generateAndSaveBalancedTeams,
    onGenerateAndSaveRandomTeams: generateAndSaveRandomTeams,
    onCreateAndSaveManualTeam: createAndSaveManualTeam,
    onClearAllTeams: clearAllTeams,
    onDeleteOneTeam: deleteOneTeam,

    loading: {
      enrollment: loadingRequestEnrollment,
      enrollments: loadingEnrollments,
      teams: loadingTeams
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
