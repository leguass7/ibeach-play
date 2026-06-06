import React from 'react'

import { ModalClassroomView, type ModalClassroomViewProps } from './modal-classroom'

export type ModalClassroomContainerProps = {
  isOpen: boolean
  onClose: () => void
  classroomId?: number
}

export const ModalClassroomContainer: React.FC<ModalClassroomContainerProps> = ({ classroomId, onClose, isOpen }) => {
  const title = classroomId && classroomId > 0 ? 'Editar turma' : 'Criar turma'
  const handleClose = () => onClose?.()
  const props: ModalClassroomViewProps = { isOpen, onClose: handleClose, classroomId, title }
  return React.createElement(ModalClassroomView, props)
}
