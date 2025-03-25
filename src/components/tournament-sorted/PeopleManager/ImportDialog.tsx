import { useState, useEffect } from 'react'

import type { IPerson } from '@/services/api/tournament/person/person.interface'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Textarea,
  Button,
  Alert,
  AlertIcon,
  Spinner,
  useDisclosure
} from '@chakra-ui/react'

interface ImportDialogProps {
  open: boolean
  onClose: () => void
  onImport: (data: Omit<IPerson, 'id'>[]) => void
  loading: boolean
}

export default function ImportDialog({ open, onClose, onImport, loading }: ImportDialogProps) {
  const { isOpen, onOpen, onClose: closeModal } = useDisclosure()
  const [importText, setImportText] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleImport = () => {
    try {
      const importedPeople: Omit<IPerson, 'id'>[] = JSON.parse(importText)
      onImport(importedPeople)
      closeModal() // Close the modal on successful import
    } catch (_err) {
      setError('Formato inválido')
    }
  }

  useEffect(() => {
    if (open) {
      onOpen()
    }
  }, [open, onOpen])

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Importar Pessoas</ModalHeader>
        <ModalBody>
          <FormControl mb={4}>
            <FormLabel>Cole o JSON aqui</FormLabel>
            <Textarea rows={6} value={importText} onChange={e => setImportText(e.target.value)} />
          </FormControl>
          {error && (
            <Alert status="error">
              <AlertIcon />
              {error}
            </Alert>
          )}
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose} mr={3}>
            Cancelar
          </Button>
          <Button onClick={handleImport} colorScheme="blue" isDisabled={loading}>
            {loading ? <Spinner size="sm" /> : 'Importar'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
