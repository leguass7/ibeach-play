import React from 'react'

import { ModalBody, ModalCloseButton, ModalHeader, type ModalProps } from '@chakra-ui/react'
import { Modal, ModalContent, ModalOverlay } from '@chakra-ui/react'

import { FormCoachClassroom } from '../FormCoachClassroom'

type ModalClassroomProps = Omit<ModalProps, 'children'> & {
  classroomId?: number
}

export const ModalClassroom: React.FC<ModalClassroomProps> = ({ classroomId, ...props }) => {
  const title = classroomId && classroomId > 0 ? 'Editar turma' : 'Criar turma'
  return (
    <Modal closeOnOverlayClick={false} {...props}>
      <ModalOverlay />
      <ModalContent m={4}>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormCoachClassroom classroomId={classroomId} />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
