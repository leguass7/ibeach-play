'use client'
import React from 'react'
import { useForm } from 'react-hook-form'

import { DatePicker } from '@/components/Inputs/DatePicker'
import { SelectOptions } from '@/components/Inputs/selects/SelectOptions'
import useFetcher from '@/hooks/useFetcher'
import { useOnceCall } from '@/hooks/useOnceCall'
import { useAdminArenaOptions } from '@/services/api/admin/arena/useAdminArena'
import { adminGetTournamentStage } from '@/services/api/admin/tournament-stage/admin-tournament-stage.api'
import { useAdminTournamentStage } from '@/services/api/admin/tournament-stage/useAdminTournamentStage'
import type { FormTournamentStageData } from '@/services/api/tournament-stage'
import { Button, Divider, FormControl, FormErrorMessage, FormLabel, HStack, Input, useToast, VStack } from '@chakra-ui/react'

import { formTournamentStageInDto, formTournamentStageOutDto } from './helpers'

export type FormAdminTournamentStageProps = {
  tournamentId: number
  tournamentStageId?: number
  onSuccess?: () => Promise<void>
  onCancel?: () => void
}

export const FormAdminTournamentStage: React.FC<FormAdminTournamentStageProps> = ({ tournamentId, tournamentStageId, onSuccess, onCancel }) => {
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
  } = useForm<FormTournamentStageData>({
    defaultValues: { name: '' }
  })

  // Fetch inicial dos dados
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

  const isLoading = loadingInit || loading
  const edit = !!tournamentStageId && tournamentStageId > 0

  return (
    <form key={`${data?.tournamentStage?.id}`} onSubmit={handleSubmit(handleFormSubmit)}>
      <VStack spacing={4} align="stretch">
        <SelectOptions
          name="arenaId"
          control={control}
          isRequired
          isDisabled={edit || isLoading}
          options={arenaOptions}
          placeholder={loadingArenas ? 'carregando...' : 'Arenas'}
        />

        <FormControl isInvalid={!!errors.name}>
          <FormLabel>Nome da Etapa do Torneio</FormLabel>
          <Input
            {...register('name', {
              required: 'Nome é obrigatório',
              maxLength: { value: 255, message: 'Máximo de 255 caracteres' }
            })}
            isDisabled={isLoading}
          />
          <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
        </FormControl>

        <DatePicker label="Data do evento" name="date" control={control} />

        <Divider />

        <HStack spacing={4} justify="flex-end">
          <Button type="submit" colorScheme="blue" isLoading={isLoading}>
            {edit ? 'Atualizar' : 'Criar'} Etapa
          </Button>
          {onCancel ? (
            <Button variant="outline" onClick={onCancel}>
              Fechar
            </Button>
          ) : null}
        </HStack>
      </VStack>
    </form>
  )
}
