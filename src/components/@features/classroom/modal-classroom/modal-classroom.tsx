import React from 'react'

import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react'

import FormCoachClassroom from '../form-coach-classroom'

export type ModalClassroomViewProps = {
  isOpen: boolean
  onClose: () => void
  classroomId?: number
  title: string
}

export function ModalClassroomView({ isOpen, onClose, classroomId, title }: ModalClassroomViewProps) {
  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent m={4}>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormCoachClassroom classroomId={classroomId} onCancel={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
