import React from 'react'
import { useForm } from 'react-hook-form'

import useFetcher from '@/hooks/useFetcher'
import { useOnceCall } from '@/hooks/useOnceCall'
import { adminGetTournament } from '@/services/api/admin/tournament/admin-tournament.api'
import { useAdminTournament } from '@/services/api/admin/tournament/useAdminTournament'
import type { FormArenaData } from '@/services/api/arena'
import { useToast } from '@chakra-ui/react'

import { FormAdminTournamentView, type FormAdminTournamentViewProps } from './form-admin-tournament'
import { formTournamentInDto, formTournamentOutDto } from './helpers'

export type FormAdminTournamentProps = {
  tournamentId?: number
  onSuccess?: () => Promise<void>
  onCancel?: () => void
}

export const FormAdminTournamentContainer: React.FC<FormAdminTournamentProps> = ({ tournamentId, onSuccess, onCancel }) => {
  const { store, loading } = useAdminTournament()
  const [requestData, loadingInit, data] = useFetcher(adminGetTournament)
  const toast = useToast()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormArenaData>({ defaultValues: { name: '' } })

  React.useEffect(() => {
    if (tournamentId && data?.tournament) {
      const formData = formTournamentInDto(data.tournament)
      if (formData) reset(formData)
    }
  }, [tournamentId, data, reset])

  const fetchInitialData = React.useCallback(async () => {
    if (tournamentId && tournamentId > 0) await requestData(tournamentId)
  }, [tournamentId, requestData])

  useOnceCall(fetchInitialData)

  const handleFormSubmit = async (formData: FormArenaData) => {
    const payload = formTournamentOutDto(formData, tournamentId)
    const response = await store(payload)
    if (response?.success) {
      await onSuccess?.()
    } else {
      toast({ title: 'Erro ao salvar torneio', description: response?.message, status: 'error', duration: 5000, isClosable: true })
    }
  }

  const props: FormAdminTournamentViewProps = {
    formKey: String(data?.tournament?.id),
    register,
    errors,
    isLoading: loadingInit || loading,
    edit: !!tournamentId && tournamentId > 0,
    onSubmit: handleSubmit(handleFormSubmit),
    onCancel
  }

  return React.createElement(FormAdminTournamentView, props)
}
