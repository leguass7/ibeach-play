'use client'

import { useState } from 'react'

import { useOnceCall } from '@/hooks/useOnceCall'
import type { IPerson } from '@/services/api/tournament/person/person.interface'
import { DownloadIcon, ArrowUpIcon } from '@chakra-ui/icons'
import { Box, Button, Spinner, Stack, Heading } from '@chakra-ui/react'

import { useTournament } from '../lib/tournament-provider'
import ImportDialog from './ImportDialog'
import PeopleTable from './PeopleTable'
import PersonFormDialog from './PersonFormDialog'

interface PeopleManagerProps {
  onSuccess: () => void
}

export default function PeopleManager({ onSuccess }: PeopleManagerProps) {
  const { people, fetchPeople, addPerson, updatePerson, deletePerson, importPeople, loading } = useTournament()

  const [formOpen, setFormOpen] = useState(false)
  const [importOpen, setImportOpen] = useState(false)
  const [currentPerson, setCurrentPerson] = useState<IPerson | null>(null)

  useOnceCall(fetchPeople)

  const openAddDialog = () => {
    setCurrentPerson(null)
    setFormOpen(true)
  }

  const openEditDialog = (person: IPerson) => {
    setCurrentPerson(person)
    setFormOpen(true)
  }

  const openImportDialog = () => {
    setImportOpen(true)
  }

  const handleExport = () => {
    if (people.length === 0) return

    const dataStr = JSON.stringify(people, null, 2)
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`
    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', 'pessoas-torneio.json')
    linkElement.click()
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Heading as="h2" size="lg">
          Gerenciar Pessoas
        </Heading>
        <Stack direction="row" spacing={3}>
          <Button leftIcon={<ArrowUpIcon />} onClick={openImportDialog} variant="outline">
            Importar
          </Button>
          <Button leftIcon={<DownloadIcon />} onClick={handleExport} variant="outline" isDisabled={people?.length === 0}>
            Exportar
          </Button>
          <Button colorScheme="blue" onClick={openAddDialog}>
            Adicionar Pessoa
          </Button>
        </Stack>
      </Box>

      {loading.people ? (
        <Box display="flex" justifyContent="center" py={5}>
          <Spinner />
        </Box>
      ) : (
        <PeopleTable people={people} onEdit={openEditDialog} onDelete={deletePerson} />
      )}

      <PersonFormDialog
        open={formOpen}
        person={currentPerson}
        onClose={() => setFormOpen(false)}
        onSave={async (data: Omit<IPerson, 'id'>) => {
          if (currentPerson) {
            await updatePerson(currentPerson?.id, data)
          } else {
            await addPerson(data)
          }
          setFormOpen(false)
          onSuccess()
        }}
        loading={loading.people}
      />

      <ImportDialog
        open={importOpen}
        onClose={() => setImportOpen(false)}
        onImport={async (data: Omit<IPerson, 'id'>[]) => {
          await importPeople(data)
          setImportOpen(false)
          onSuccess()
        }}
        loading={loading.people}
      />
    </Box>
  )
}
