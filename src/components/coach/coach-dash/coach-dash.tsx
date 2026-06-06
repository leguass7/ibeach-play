import React from 'react'
import { PiStudentFill } from 'react-icons/pi'
import { SiGoogleclassroom } from 'react-icons/si'

import { CardLinkIcon } from '@/components/ui/card-link-icon'
import { GridItem, SimpleGrid } from '@chakra-ui/react'

export type CoachDashViewProps = {
  classroomCount: number
  studentCount: number
  isLoading: boolean
  onClickClassrooms: () => void
  onClickStudents: () => void
}

export function CoachDashView({ classroomCount, studentCount, isLoading, onClickClassrooms, onClickStudents }: CoachDashViewProps) {
  return (
    <SimpleGrid gap={5} columns={{ lg: 4, xl: 4, md: 3, base: 1, sm: 2 }}>
      <GridItem>
        <CardLinkIcon
          icon={SiGoogleclassroom}
          title="Turmas"
          description={`${classroomCount} turmas cadastradas`}
          onClick={onClickClassrooms}
          isLoading={isLoading}
        />
      </GridItem>
      <GridItem>
        <CardLinkIcon
          icon={PiStudentFill}
          title="Alunos"
          description={`${studentCount} alunos cadastrados`}
          onClick={onClickStudents}
          isLoading={isLoading}
        />
      </GridItem>
    </SimpleGrid>
  )
}
