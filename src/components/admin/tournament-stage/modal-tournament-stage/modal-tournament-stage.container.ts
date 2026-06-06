import React from 'react'

import { ModalTournamentStageView, type ModalTournamentStageViewProps } from './modal-tournament-stage'

export type ModalTournamentStageContainerProps = {
  isOpen: boolean
  onClose: () => void
  tournamentId: number
  tournamentStageId?: number
  onSuccess?: () => Promise<void>
}

export const ModalTournamentStageContainer: React.FC<ModalTournamentStageContainerProps> = ({
  tournamentId,
  tournamentStageId,
  onClose,
  onSuccess,
  isOpen
}) => {
  const title = tournamentStageId && tournamentStageId > 0 ? 'Editar etapa' : 'Criar etapa'
  const handleClose = () => onClose?.()

  const props: ModalTournamentStageViewProps = { isOpen, onClose: handleClose, tournamentId, tournamentStageId, onSuccess, title }
  return React.createElement(ModalTournamentStageView, props)
}
