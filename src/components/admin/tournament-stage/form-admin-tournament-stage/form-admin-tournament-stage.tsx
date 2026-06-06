import React from 'react'
import type { Control, FieldErrors, UseFormRegister } from 'react-hook-form'

import { DatePicker } from '@/components/ui/date-picker'
import { SelectOptions } from '@/components/ui/select-options'
import type { FormTournamentStageData } from '@/services/api/tournament-stage'
import { Button, Divider, FormControl, FormErrorMessage, FormLabel, HStack, Input, VStack } from '@chakra-ui/react'
import type { Options } from '@ui/select-options'

export type FormAdminTournamentStageViewProps = {
  formKey: string
  register: UseFormRegister<FormTournamentStageData>
  control: Control<FormTournamentStageData>
  errors: FieldErrors<FormTournamentStageData>
  isLoading: boolean
  loadingArenas: boolean
  edit: boolean
  arenaOptions: Options
  onSubmit: React.FormEventHandler<HTMLFormElement>
  onCancel?: () => void
}

export function FormAdminTournamentStageView({
  formKey,
  register,
  control,
  errors,
  isLoading,
  loadingArenas,
  edit,
  arenaOptions,
  onSubmit,
  onCancel
}: FormAdminTournamentStageViewProps) {
  return (
    <form key={formKey} onSubmit={onSubmit}>
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
