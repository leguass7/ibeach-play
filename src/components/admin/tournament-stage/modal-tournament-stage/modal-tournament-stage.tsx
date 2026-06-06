import React from 'react'

import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react'

import type { FormAdminTournamentStageProps } from '../form-admin-tournament-stage'
import FormAdminTournamentStage from '../form-admin-tournament-stage'

export type ModalTournamentStageViewProps = {
  isOpen: boolean
  onClose: () => void
  tournamentId: number
  tournamentStageId?: number
  onSuccess?: FormAdminTournamentStageProps['onSuccess']
  title: string
}

export function ModalTournamentStageView({ isOpen, onClose, tournamentId, tournamentStageId, onSuccess, title }: ModalTournamentStageViewProps) {
  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent m={4}>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormAdminTournamentStage tournamentId={tournamentId} tournamentStageId={tournamentStageId} onCancel={onClose} onSuccess={onSuccess} />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
