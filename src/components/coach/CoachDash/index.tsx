import React from 'react'
import { PiStudentFill } from 'react-icons/pi'
import { SiGoogleclassroom } from 'react-icons/si'

import { CardLinkIcon } from '@/components/CardLinkIcon'
import { SimpleGrid, GridItem } from '@chakra-ui/react'

export const CoachDash: React.FC = () => {
  return (
    <SimpleGrid gap={5} columns={{ lg: 4, xl: 4, md: 3, base: 1, sm: 2 }}>
      <GridItem>
        <CardLinkIcon icon={SiGoogleclassroom} title="Turmas" description="0 turmas cadatradas" link="/coach/classroom" />
      </GridItem>
      <GridItem>
        <CardLinkIcon icon={PiStudentFill} title="Alunos" description="0 alunos cadatrados" link="/coach/student" />
      </GridItem>
    </SimpleGrid>
  )
}
