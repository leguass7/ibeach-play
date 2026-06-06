import React from 'react'

import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react'

import type { FormAdminTournamentProps } from '../form-admin-tournament'
import FormAdminTournament from '../form-admin-tournament'

export type ModalTournamentViewProps = {
  isOpen: boolean
  onClose: () => void
  tournamentId?: number
  onSuccess?: FormAdminTournamentProps['onSuccess']
  title: string
}

export function ModalTournamentView({ isOpen, onClose, tournamentId, onSuccess, title }: ModalTournamentViewProps) {
  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent m={4}>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormAdminTournament tournamentId={tournamentId} onCancel={onClose} onSuccess={onSuccess} />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
