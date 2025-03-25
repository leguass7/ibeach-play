import { useEffect } from 'react'

import type { IBracketMatch } from '@/services/api/tournament/bracket/bracket.interface'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Stack, useDisclosure } from '@chakra-ui/react'

interface ScoreDialogProps {
  open: boolean
  onClose: () => void
  match: { roundIndex: number; matchIndex: number; match: IBracketMatch } | null
  scores: { score1: number; score2: number }
  setScores: (scores: { score1: number; score2: number }) => void
  onSave: () => void
  loading: boolean
}

export default function ScoreDialog({ open, onClose, match, scores, setScores, onSave, loading }: ScoreDialogProps) {
  const { isOpen, onOpen, onClose: closeModal } = useDisclosure()

  useEffect(() => {
    if (open) {
      onOpen()
    }
  }, [open, onOpen])

  if (!match) return null

  const { match: selectedMatch } = match
  const team1 = selectedMatch.team1
  const team2 = selectedMatch.team2

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xs">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Atualizar Placar</ModalHeader>
        <ModalBody>
          <Stack spacing={4} mt={2}>
            <Input
              placeholder={team1 ? `${team1.person1.name} / ${team1.person2.name}` : 'Time 1'}
              type="number"
              value={scores.score1}
              onChange={e => setScores({ ...scores, score1: Number(e.target.value) })}
            />
            <Input
              placeholder={team2 ? `${team2.person1.name} / ${team2.person2.name}` : 'Time 2'}
              type="number"
              value={scores.score2}
              onChange={e => setScores({ ...scores, score2: Number(e.target.value) })}
            />
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose} isDisabled={loading} mr={3}>
            Cancelar
          </Button>
          <Button onClick={onSave} colorScheme="blue" isDisabled={loading}>
            {loading ? 'Salvando...' : 'Salvar'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
