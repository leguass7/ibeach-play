'use client'
import { createContext, useContext, useState, type ReactNode } from 'react'

import type { EnrollmentDTO } from '@/@server-side/use-cases/enrollment'
import useFetcher from '@/hooks/useFetcher'
import { useOnceCall } from '@/hooks/useOnceCall'
import {
  createEnrollment,
  deleteEnrollment,
  importEnrollment,
  paginateEnrollment,
  updateEnrollment,
  type FormEnrollmentData
} from '@/services/api/enrollment'

interface TournamentContextType {
  // Pessoas
  enrollments: EnrollmentDTO[]
  fetchEnrollments: () => Promise<EnrollmentDTO[]>
  addEnrollment: (person: FormEnrollmentData) => Promise<EnrollmentDTO>
  editEnrollment: (id: string, person: FormEnrollmentData) => Promise<EnrollmentDTO>
  deleteEnrollment: (id: string) => Promise<void>
  importEnrollments: (persons: FormEnrollmentData[]) => Promise<EnrollmentDTO[]>

  // Estados de carregamento
  loading: {
    enrollments: boolean
  }
}

const TournamentContext = createContext<TournamentContextType | undefined>(undefined)

export function TournamentStageProvider({ children }: { children: ReactNode }) {
  const [enrollments, setEnrollment] = useState<EnrollmentDTO[]>([])

  // Hooks fetcher
  const [fetchEnrollments, loadingEnrollments] = useFetcher(async () => {
    const data = await paginateEnrollment()
    const enrollments = data?.enrollments || []
    setEnrollment(enrollments)
    return enrollments
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

  const editEnrollment = async (id: string, person: FormEnrollmentData): Promise<EnrollmentDTO> => {
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

  // Inicializar dados
  useOnceCall(fetchEnrollments)

  const value = {
    enrollments,
    fetchEnrollments,
    addEnrollment,
    editEnrollment,
    deleteEnrollment: deleteEnrollmentPerson,
    importEnrollments,

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
