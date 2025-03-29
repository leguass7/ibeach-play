import type { EnrollmentDTO } from '@/@server-side/use-cases/enrollment'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { IconButton, Table, Thead, Tbody, Tr, Th, Td, TableContainer } from '@chakra-ui/react'

interface PeopleTableProps {
  people: EnrollmentDTO[]
  onEdit: (person: EnrollmentDTO) => void
  onDelete: (id: string) => void
}

export default function PeopleTable({ people, onEdit, onDelete }: PeopleTableProps) {
  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Nome</Th>
            <Th>Peso</Th>
            <Th>Cabeça de Chave</Th>
            <Th isNumeric>Ações</Th>
          </Tr>
        </Thead>
        <Tbody>
          {people.map(person => (
            <Tr key={person.id}>
              <Td>{person.name}</Td>
              <Td>{person.weight}</Td>
              {/* <Td>{person.isSeeded ? 'Sim' : 'Não'}</Td> */}
              <Td isNumeric>
                <IconButton size="sm" colorScheme="blue" aria-label="Edit" icon={<EditIcon />} onClick={() => onEdit(person)} mr={2} />
                <IconButton size="sm" colorScheme="red" aria-label="Delete" icon={<DeleteIcon />} onClick={() => onDelete(person.id)} />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
