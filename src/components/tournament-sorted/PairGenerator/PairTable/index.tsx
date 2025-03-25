import { memo } from 'react'

import type { IPair } from '@/services/api/tournament/pair/pair.interface'
import { DeleteIcon } from '@chakra-ui/icons'
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Box, CircularProgress, IconButton, Text, useToast, Tag } from '@chakra-ui/react'

import { useTournament } from '../../lib/tournament-provider'
import PersonRow from './PersonRow'

interface Props {
  pairs: IPair[]
  loading: boolean
}

const PairTable = ({ pairs, loading }: Props) => {
  const { deletePair } = useTournament()
  const toast = useToast()

  const handleDeletePair = async (pairId: string) => {
    try {
      await deletePair(pairId)
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
                <PersonRow person={pair?.person1} />
                <PersonRow person={pair?.person2} />
              </Td>
              <Td>
                <Tag colorScheme="green">{pair?.totalWeight}</Tag>
              </Td>
              <Td>{pair?.hasSeeded ? 'Sim' : 'Não'}</Td>
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
