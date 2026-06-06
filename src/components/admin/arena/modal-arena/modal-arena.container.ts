import React from 'react'

import type { FormAdminProps } from '../form-admin-arena'
import { ModalArenaView, type ModalArenaViewProps } from './modal-arena'

export type ModalArenaContainerProps = {
  isOpen: boolean
  onClose: () => void
  arenaId?: number
  onSuccess?: FormAdminProps['onSuccess']
}

export const ModalArenaContainer: React.FC<ModalArenaContainerProps> = ({ arenaId, onClose, onSuccess, isOpen }) => {
  const title = arenaId && arenaId > 0 ? 'Editar arena' : 'Criar arena'
  const handleClose = () => onClose?.()

  const props: ModalArenaViewProps = { isOpen, onClose: handleClose, arenaId, onSuccess, title }
  return React.createElement(ModalArenaView, props)
}
