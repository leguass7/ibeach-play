import type { EnrollmentDTO } from '@/@server-side/use-cases/enrollment'
import { useOnceCall } from '@/hooks/useOnceCall'
import { Box, Spinner, Tag, Text } from '@chakra-ui/react'

import { useTournamentStageProvider } from '../../TournamentStageProvider'

type PersonRowProps = {
  personId: EnrollmentDTO['id']
}

export default function PersonRow({ personId }: PersonRowProps) {
  const { requestEnrollment, loading, enrollment } = useTournamentStageProvider()

  useOnceCall(() => requestEnrollment(personId))

  return loading?.enrollment ? (
    <Spinner size="sm" />
  ) : !enrollment ? (
    <Text fontSize="sm" color="gray.500">
      Nenhum jogador encontrado
    </Text>
  ) : (
    <Box display="flex" alignItems="center">
      {/* {person?.isSeeded && <Icon as={StarIcon} color="gold" mr={1} fontSize="16px" />} */}
      <Text fontSize="sm">{enrollment?.name}</Text>
      <Tag size="sm" colorScheme="blue" variant="outline" ml={1}>
        Peso: {enrollment?.weight}
      </Tag>
    </Box>
  )
}
