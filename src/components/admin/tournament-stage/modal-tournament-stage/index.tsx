import React from 'react'

import { ModalBody, ModalCloseButton, ModalHeader, type ModalProps } from '@chakra-ui/react'
import { Modal, ModalContent, ModalOverlay } from '@chakra-ui/react'

import { FormAdminTournamentStage, type FormAdminTournamentStageProps } from '../form-admin-tournament-stage'

type ModalTournamentProps = Omit<ModalProps, 'children'> & {
  tournamentId: number
  tournamentStageId?: number
  onSuccess?: FormAdminTournamentStageProps['onSuccess']
}

export const ModalTournamentStage: React.FC<ModalTournamentProps> = ({ tournamentId, tournamentStageId, onClose, onSuccess, ...props }) => {
  const title = tournamentStageId && tournamentStageId > 0 ? 'Editar etapa' : 'Criar etapa'

  const handleClose = () => {
    if (onClose) onClose?.()
  }
  return (
    <Modal closeOnOverlayClick={false} {...props} onClose={handleClose}>
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
