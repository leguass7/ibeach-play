import React from 'react'

import { ModalBody, ModalCloseButton, ModalHeader, type ModalProps } from '@chakra-ui/react'
import { Modal, ModalContent, ModalOverlay } from '@chakra-ui/react'

import { FormAdminArena } from '../FormAdminArena'

type ModalArenaProps = Omit<ModalProps, 'children'> & {
  arenaId?: number
}

export const ModalArena: React.FC<ModalArenaProps> = ({ arenaId, onClose, ...props }) => {
  const title = arenaId && arenaId > 0 ? 'Editar arena' : 'Criar arena'

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
          <FormAdminArena arenaId={arenaId} onCancel={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
