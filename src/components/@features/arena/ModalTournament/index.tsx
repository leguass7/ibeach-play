import React from 'react'

import { ModalBody, ModalCloseButton, ModalHeader, type ModalProps } from '@chakra-ui/react'
import { Modal, ModalContent, ModalOverlay } from '@chakra-ui/react'

import { FormAdminTournament } from '../../tournament/FormAdminTournament'

type ModalTournamentProps = Omit<ModalProps, 'children'> & {
  tournamentId?: number
}

export const ModalTournament: React.FC<ModalTournamentProps> = ({ tournamentId, onClose, ...props }) => {
  const title = tournamentId && tournamentId > 0 ? 'Editar torneio' : 'Criar torneio'

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
          <FormAdminTournament tournamentId={tournamentId} onCancel={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
