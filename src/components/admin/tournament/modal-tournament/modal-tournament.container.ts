import React from 'react'

import type { FormAdminTournamentProps } from '../form-admin-tournament'
import { ModalTournamentView, type ModalTournamentViewProps } from './modal-tournament'

export type ModalTournamentContainerProps = {
  isOpen: boolean
  onClose: () => void
  tournamentId?: number
  onSuccess?: FormAdminTournamentProps['onSuccess']
}

export const ModalTournamentContainer: React.FC<ModalTournamentContainerProps> = ({ tournamentId, onClose, onSuccess, isOpen }) => {
  const title = tournamentId && tournamentId > 0 ? 'Editar torneio' : 'Criar torneio'
  const handleClose = () => onClose?.()

  const props: ModalTournamentViewProps = { isOpen, onClose: handleClose, tournamentId, onSuccess, title }
  return React.createElement(ModalTournamentView, props)
}
