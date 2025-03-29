import { useEffect, useState } from 'react'

import type { EnrollmentDTO } from '@/@server-side/use-cases/enrollment'
import type { FormEnrollmentData } from '@/services/api/enrollment'
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure
} from '@chakra-ui/react'

interface PersonFormDialogProps {
  open: boolean
  person: EnrollmentDTO | null
  onClose: () => void
  onSave: (data: FormEnrollmentData) => void
  loading: boolean
}

export default function PersonFormDialog({ open, person, onClose, onSave, loading }: PersonFormDialogProps) {
  const { isOpen, onOpen, onClose: closeModal } = useDisclosure()

  const [name, setName] = useState(person?.name || '')
  const [weight, setWeight] = useState(person?.weight || 1)
  // const [isSeeded, setIsSeeded] = useState(person?.isSeeded || false)

  const handleSubmit = () => {
    if (!name.trim()) return
    onSave({
      name,
      weight
    } as FormEnrollmentData)
    closeModal()
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
        <ModalHeader>{person ? 'Editar Pessoa' : 'Adicionar Pessoa'}</ModalHeader>
        <ModalBody>
          <FormControl id="name" mb={4}>
            <FormLabel>Nome</FormLabel>
            <Input value={name} onChange={e => setName(e.target.value)} />
          </FormControl>
          <FormControl id="weight" mb={4}>
            <FormLabel>Peso (1-10)</FormLabel>
            <Input type="number" value={weight} onChange={e => setWeight(Number(e.target.value) || 1)} />
          </FormControl>
          {/* <FormControl mb={4}>
            <Checkbox isChecked={isSeeded} onChange={e => setIsSeeded(e.target.checked)}>
              Cabeça de Chave
            </Checkbox>
          </FormControl> */}
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose} mr={3}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} colorScheme="blue" isDisabled={loading}>
            {loading ? <Spinner size="sm" /> : 'Salvar'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
