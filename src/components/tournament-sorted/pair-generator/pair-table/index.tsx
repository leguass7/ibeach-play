import { memo } from 'react'

import type { TeamDTO } from '@/@server-side/use-cases/team'
import { DeleteIcon } from '@chakra-ui/icons'
import { Box, CircularProgress, IconButton, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useToast } from '@chakra-ui/react'

import { useTournamentStageProvider } from '../../TournamentStageProvider'
import PersonRow from './PersonRow'

interface Props {
  pairs: TeamDTO[]
  loading: boolean
}

const PairTable = ({ pairs, loading }: Props) => {
  const { onDeleteOneTeam } = useTournamentStageProvider()
  const toast = useToast()

  const handleDeletePair = async (pairId: string) => {
    try {
      await onDeleteOneTeam(pairId)
      toast({ title: 'Pair deleted successfully.', status: 'success' })
    } catch (_error) {
      toast({ title: 'Failed to delete pair.', status: 'error' })
    }
  }

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" py={5}>
        <CircularProgress isIndeterminate />
      </Box>
    )
  }

  if (pairs.length === 0) {
    return (
      <Box textAlign="center" py={5}>
        <Text color="gray.500">{"Clique em 'Gerar Duplas' para formar as duplas automaticamente."}</Text>
      </Box>
    )
  }

  return (
    <TableContainer>
      <Table>
        <Thead>
          <Tr>
            <Th>Dupla</Th>
            <Th>Peso Total</Th>
            <Th>Cabeça de Chave</Th>
            <Th isNumeric>Ações</Th>
          </Tr>
        </Thead>
        <Tbody>
          {pairs?.map(pair => (
            <Tr key={pair?.id}>
              <Td>
                <PersonRow personId={pair?.playerAId} />
                <PersonRow personId={pair?.playerBId} />
              </Td>
              {/* <Td>
                <Tag colorScheme="green">{pair?.totalWeight}</Tag>
              </Td> */}
              {/* <Td>{pair?.hasSeeded ? 'Sim' : 'Não'}</Td> */}
              <Td isNumeric>
                <IconButton size="sm" colorScheme="red" aria-label="Delete Pair" icon={<DeleteIcon />} onClick={() => handleDeletePair(pair?.id)} />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default memo(PairTable)
