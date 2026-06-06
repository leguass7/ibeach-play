import React from 'react'
import { PiStudentFill } from 'react-icons/pi'
import { SiGoogleclassroom } from 'react-icons/si'

import { CardLinkIcon } from '@/components/ui/card-link-icon'
import { useCoachDash } from '@/services/api/coach/useCoachDash'
import { SimpleGrid, GridItem } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'

export const CoachDash: React.FC = () => {
  const router = useRouter()
  const { data, isLoading } = useCoachDash()

  const classroomCount = data?.classroomCount || 0
  const studentCount = data?.studentCount || 0

  return (
    <SimpleGrid gap={5} columns={{ lg: 4, xl: 4, md: 3, base: 1, sm: 2 }}>
      <GridItem>
        <CardLinkIcon
          icon={SiGoogleclassroom}
          title="Turmas"
          description={`${classroomCount} turmas cadatradas`}
          onClick={() => router.push('/coach/classroom')}
          isLoading={isLoading}
        />
      </GridItem>
      <GridItem>
        <CardLinkIcon
          icon={PiStudentFill}
          title="Alunos"
          description={`${studentCount} alunos cadatrados`}
          onClick={() => router.push('/coach/student')}
          isLoading={isLoading}
        />
      </GridItem>
    </SimpleGrid>
  )
}
