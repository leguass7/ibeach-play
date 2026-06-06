import React from 'react'
import type { FieldErrors, UseFormRegister } from 'react-hook-form'

import type { FormArenaData } from '@/services/api/arena'
import { Button, Divider, FormControl, FormErrorMessage, FormLabel, Input, SimpleGrid, VStack } from '@chakra-ui/react'

export type FormAdminTournamentViewProps = {
  formKey: string
  register: UseFormRegister<FormArenaData>
  errors: FieldErrors<FormArenaData>
  isLoading: boolean
  edit: boolean
  onSubmit: React.FormEventHandler<HTMLFormElement>
  onCancel?: () => void
}

export function FormAdminTournamentView({ formKey, register, errors, isLoading, edit, onSubmit, onCancel }: FormAdminTournamentViewProps) {
  return (
    <form key={formKey} onSubmit={onSubmit}>
      <VStack spacing={4} align="stretch">
        <FormControl isInvalid={!!errors.name}>
          <FormLabel>Nome do Torneio</FormLabel>
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
            {edit ? 'Atualizar' : 'Criar'} Torneio
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
