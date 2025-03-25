'use client'
import React from 'react'
import { useForm } from 'react-hook-form'

import useFetcher from '@/hooks/useFetcher'
import { useOnceCall } from '@/hooks/useOnceCall'
import { adminGetArena } from '@/services/api/admin/arena'
import { useAdminArena } from '@/services/api/admin/arena/useAdminArena'
import type { FormArenaData } from '@/services/api/arena'
import { Button, Divider, FormControl, FormErrorMessage, FormLabel, Input, SimpleGrid, useToast, VStack } from '@chakra-ui/react'

import { formArenaInDto, formArenaOutDto } from './helpers'

export type FormAdminProps = {
  arenaId?: number
  onSuccess?: () => Promise<void>
  onCancel?: () => void
}

export const FormAdminArena: React.FC<FormAdminProps> = ({ arenaId, onSuccess, onCancel }) => {
  const { store, loading } = useAdminArena()
  const [requestData, loadingInit, data] = useFetcher(adminGetArena)
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
    if (arenaId && data?.arena) {
      const formData = formArenaInDto(data.arena)
      if (formData) {
        reset(formData)
      }
    }
  }, [arenaId, data, reset])

  const fetchInitialData = React.useCallback(async () => {
    if (arenaId && arenaId > 0) await requestData(arenaId)
  }, [arenaId, requestData])

  useOnceCall(fetchInitialData)

  const handleFormSubmit = async (formData: FormArenaData) => {
    const payload = formArenaOutDto(formData, arenaId)

    const response = await store(payload)
    if (response?.success) {
      await onSuccess?.()
    } else {
      toast({
        title: 'Erro ao salvar arena',
        description: response?.message,
        status: 'error',
        duration: 5000,
        isClosable: true
      })
    }
  }

  const isLoading = loadingInit || loading
  const edit = !!arenaId && arenaId > 0

  return (
    <form key={`${data?.arena?.id}`} onSubmit={handleSubmit(handleFormSubmit)}>
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
