'use client'
import React from 'react'
import { useForm } from 'react-hook-form'

import useFetcher from '@/hooks/useFetcher'
import { useOnceCall } from '@/hooks/useOnceCall'
import { adminGetTournament } from '@/services/api/admin/tournament/admin-tournament.api'
import { useAdminTournament } from '@/services/api/admin/tournament/useAdminTournament'
import type { FormArenaData } from '@/services/api/arena'
import { Button, Divider, FormControl, FormErrorMessage, FormLabel, Input, SimpleGrid, useToast, VStack } from '@chakra-ui/react'

import { formTournamentInDto, formTournamentOutDto } from './helpers'

export type FormAdminTournamentProps = {
  tournamentId?: number
  onSuccess?: () => Promise<void>
  onCancel?: () => void
}

export const FormAdminTournament: React.FC<FormAdminTournamentProps> = ({ tournamentId, onSuccess, onCancel }) => {
  const { store, loading } = useAdminTournament()
  const [requestData, loadingInit, data] = useFetcher(adminGetTournament)
  const toast = useToast()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormArenaData>({
    defaultValues: { name: '' }
  })

  // Fetch inicial dos dados
  React.useEffect(() => {
    if (tournamentId && data?.tournament) {
      const formData = formTournamentInDto(data.tournament)
      if (formData) {
        reset(formData)
      }
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
      toast({
        title: 'Erro ao salvar torneio',
        description: response?.message,
        status: 'error',
        duration: 5000,
        isClosable: true
      })
    }
  }

  const isLoading = loadingInit || loading
  const edit = !!tournamentId && tournamentId > 0

  return (
    <form key={`${data?.tournament?.id}`} onSubmit={handleSubmit(handleFormSubmit)}>
      <VStack spacing={4} align="stretch">
        <FormControl isInvalid={!!errors.name}>
          <FormLabel>Nome da Arena</FormLabel>
          <Input
            {...register('name', {
              required: 'Nome é obrigatório',
              maxLength: { value: 255, message: 'Máximo de 255 caracteres' }
            })}
            isDisabled={isLoading}
          />
          <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
        </FormControl>

        <Divider />

        <SimpleGrid columns={2} spacing={4}>
          <Button type="submit" colorScheme="blue" isLoading={isLoading}>
            {edit ? 'Atualizar' : 'Criar'} Arena
          </Button>
          {onCancel ? (
            <Button variant="outline" onClick={onCancel}>
              Fechar
            </Button>
          ) : null}
        </SimpleGrid>
      </VStack>
    </form>
  )
}
