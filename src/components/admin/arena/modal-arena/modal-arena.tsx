import React from 'react'

import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react'

import type { FormAdminProps } from '../form-admin-arena'
import FormAdminArena from '../form-admin-arena'

export type ModalArenaViewProps = {
  isOpen: boolean
  onClose: () => void
  arenaId?: number
  onSuccess?: FormAdminProps['onSuccess']
  title: string
}

export function ModalArenaView({ isOpen, onClose, arenaId, onSuccess, title }: ModalArenaViewProps) {
  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent m={4}>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormAdminArena arenaId={arenaId} onCancel={onClose} onSuccess={onSuccess} />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
