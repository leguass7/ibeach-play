import React from 'react'

import { useCoachDash } from '@/services/api/coach/useCoachDash'
import { useRouter } from 'next/navigation'

import { CoachDashView, type CoachDashViewProps } from './coach-dash'

export const CoachDashContainer: React.FC = () => {
  const router = useRouter()
  const { data, isLoading } = useCoachDash()

  const props: CoachDashViewProps = {
    classroomCount: data?.classroomCount || 0,
    studentCount: data?.studentCount || 0,
    isLoading,
    onClickClassrooms: () => router.push('/coach/classroom'),
    onClickStudents: () => router.push('/coach/student')
  }

  return React.createElement(CoachDashView, props)
}
