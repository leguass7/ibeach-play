'use client'

import { useState } from 'react'

import type { EnrollmentDTO } from '@/@server-side/use-cases/enrollment'
import { useOnceCall } from '@/hooks/useOnceCall'
import type { FormEnrollmentData } from '@/services/api/enrollment'
import { DownloadIcon } from '@chakra-ui/icons'
import { Box, Button, Heading, Spinner, Stack } from '@chakra-ui/react'

import { useTournamentStageProvider } from '../TournamentStageProvider'
import PeopleTable from './PeopleTable'
import PersonFormDialog from './PersonFormDialog'

interface PeopleManagerProps {
  onSuccess: () => void
}

export default function PeopleManager({ onSuccess }: PeopleManagerProps) {
  const { enrollments, fetchEnrollments, addEnrollment, editEnrollment, deleteEnrollment, loading } = useTournamentStageProvider()

  const [formOpen, setFormOpen] = useState(false)
  // const [importOpen, setImportOpen] = useState(false)
  const [currentPerson, setCurrentPerson] = useState<EnrollmentDTO | null>(null)

  useOnceCall(fetchEnrollments)

  const openAddDialog = () => {
    setCurrentPerson(null)
    setFormOpen(true)
  }

  const openEditDialog = (person: EnrollmentDTO) => {
    setCurrentPerson(person)
    setFormOpen(true)
  }

  // const openImportDialog = () => {
  //   setImportOpen(true)
  // }

  const handleExport = () => {
    if (enrollments.length === 0) return

    const dataStr = JSON.stringify(enrollments, null, 2)
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`
    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', 'pessoas-torneio.json')
    linkElement.click()
  }

  return (
    <Box>
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="space-between"
        alignItems={{ base: 'flex-start', md: 'center' }}
        mb={4}
        gap={4}
        flexDirection={{ base: 'column', md: 'row' }}
      >
        <Heading as="h2" size="lg" textAlign={{ base: 'center', md: 'left' }} flex="1">
          Gerenciar Inscritos
        </Heading>
        <Stack
          direction={{ base: 'column', md: 'row' }}
          spacing={3}
          align={{ base: 'stretch', md: 'center' }}
          flex="1"
          justify={{ base: 'flex-start', md: 'flex-end' }}
        >
          {/* <Button leftIcon={<ArrowUpIcon />} onClick={openImportDialog} variant="outline">
            Importar
          </Button> */}
          <Button leftIcon={<DownloadIcon />} onClick={handleExport} variant="outline" isDisabled={enrollments?.length === 0}>
            Exportar
          </Button>
          <Button colorScheme="blue" onClick={openAddDialog}>
            Adicionar Pessoa
          </Button>
        </Stack>
      </Box>

      {loading.enrollments ? (
        <Box display="flex" justifyContent="center" py={5}>
          <Spinner />
        </Box>
      ) : (
        <PeopleTable people={enrollments} onEdit={openEditDialog} onDelete={deleteEnrollment} />
      )}

      <PersonFormDialog
        open={formOpen}
        person={currentPerson}
        onClose={() => setFormOpen(false)}
        onSave={async (data: FormEnrollmentData) => {
          if (currentPerson) {
            await editEnrollment(currentPerson?.id, data)
          } else {
            await addEnrollment(data)
          }
          setFormOpen(false)
          onSuccess()
        }}
        loading={loading.enrollments}
      />

      {/* <ImportDialog
        open={importOpen}
        onClose={() => setImportOpen(false)}
        onImport={async (data: FormEnrollmentData[]) => {
          await importEnrollments(data)
          setImportOpen(false)
          onSuccess()
        }}
        loading={loading.enrollments}
      /> */}
    </Box>
  )
}
