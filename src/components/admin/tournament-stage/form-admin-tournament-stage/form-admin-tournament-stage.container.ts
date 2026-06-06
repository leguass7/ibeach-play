import React from 'react'
import { useForm } from 'react-hook-form'

import useFetcher from '@/hooks/useFetcher'
import { useOnceCall } from '@/hooks/useOnceCall'
import { useAdminArenaOptions } from '@/services/api/admin/arena/useAdminArena'
import { adminGetTournamentStage } from '@/services/api/admin/tournament-stage/admin-tournament-stage.api'
import { useAdminTournamentStage } from '@/services/api/admin/tournament-stage/useAdminTournamentStage'
import type { FormTournamentStageData } from '@/services/api/tournament-stage'
import { useToast } from '@chakra-ui/react'

import { FormAdminTournamentStageView, type FormAdminTournamentStageViewProps } from './form-admin-tournament-stage'
import { formTournamentStageInDto, formTournamentStageOutDto } from './helpers'

export type FormAdminTournamentStageProps = {
  tournamentId: number
  tournamentStageId?: number
  onSuccess?: () => Promise<void>
  onCancel?: () => void
}

export const FormAdminTournamentStageContainer: React.FC<FormAdminTournamentStageProps> = ({
  tournamentId,
  tournamentStageId,
  onSuccess,
  onCancel
}) => {
  const { store, loading } = useAdminTournamentStage(tournamentId)
  const [requestData, loadingInit, data] = useFetcher(adminGetTournamentStage)
  const [requestArenas, loadingArenas, arenaOptions] = useAdminArenaOptions()
  const toast = useToast()

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors }
  } = useForm<FormTournamentStageData>({ defaultValues: { name: '' } })

  React.useEffect(() => {
    if (tournamentStageId && data?.tournamentStage) {
      const formData = formTournamentStageInDto(data.tournamentStage)
      if (formData) {
        reset(formData)
      }
    }
  }, [tournamentId, tournamentStageId, data, reset])

  const fetchInitialData = React.useCallback(async () => {
    await requestArenas()
    if (tournamentStageId && tournamentStageId > 0) await requestData(tournamentStageId)
  }, [tournamentStageId, requestData, requestArenas])

  useOnceCall(fetchInitialData)

  const handleFormSubmit = async (formData: FormTournamentStageData) => {
    const payload = formTournamentStageOutDto(formData, tournamentStageId)
    console.log('formData', payload, payload?.date?.toISOString())

    const response = await store(payload)
    if (response?.success) {
      await onSuccess?.()
    } else {
      toast({
        title: 'Erro ao salvar etapa do torneio',
        description: response?.message,
        status: 'error',
        duration: 5000,
        isClosable: true
      })
    }
  }

  const props: FormAdminTournamentStageViewProps = {
    formKey: String(data?.tournamentStage?.id),
    register,
    control,
    errors,
    isLoading: loadingInit || loading,
    loadingArenas,
    edit: !!tournamentStageId && tournamentStageId > 0,
    arenaOptions: arenaOptions ?? [],
    onSubmit: handleSubmit(handleFormSubmit),
    onCancel
  }

  return React.createElement(FormAdminTournamentStageView, props)
}
