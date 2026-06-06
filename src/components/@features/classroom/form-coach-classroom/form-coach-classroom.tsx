'use client'
import React from 'react'
import type { Control, FieldErrors, UseFormRegister } from 'react-hook-form'
import type { FieldArrayWithId } from 'react-hook-form'
import { FiPlus, FiTrash } from 'react-icons/fi'

import { SelectOptions } from '@/components/ui/select-options'
import type { Options } from '@/components/ui/select-options'
import type { FormClassroomData } from '@/services/api/classroom'
import { Button, Divider, Flex, FormControl, FormErrorMessage, FormLabel, IconButton, Input, Select, SimpleGrid, VStack } from '@chakra-ui/react'

import { weekDays } from './helpers'

export type FormCoachClassroomViewProps = {
  formKey: string
  register: UseFormRegister<FormClassroomData>
  control: Control<FormClassroomData>
  errors: FieldErrors<FormClassroomData>
  fields: FieldArrayWithId<FormClassroomData, 'hours', 'id'>[]
  isLoading: boolean
  loadingArenas: boolean
  edit: boolean
  arenaOptions: Options
  onSubmit: React.FormEventHandler<HTMLFormElement>
  onCancel?: () => void
  onAppendHour: () => void
  onRemoveHour: (index: number) => void
}

export function FormCoachClassroomView({
  formKey,
  register,
  control,
  errors,
  fields,
  isLoading,
  loadingArenas,
  edit,
  arenaOptions,
  onSubmit,
  onCancel,
  onAppendHour,
  onRemoveHour
}: FormCoachClassroomViewProps) {
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
        <FormControl isInvalid={!!errors.label}>
          <FormLabel>Nome da Turma</FormLabel>
          <Input
            {...register('label', {
              required: 'Nome é obrigatório',
              maxLength: { value: 255, message: 'Máximo de 255 caracteres' }
            })}
            isDisabled={isLoading}
          />
          <FormErrorMessage>{errors.label?.message}</FormErrorMessage>
        </FormControl>

        <Divider />

        <FormLabel>Horários</FormLabel>
        {fields.map((field, index) => (
          <Flex key={field.id} gap={2}>
            <FormControl isInvalid={!!errors.hours?.[index]?.weekDay}>
              <Select {...register(`hours.${index}.weekDay`)} isDisabled={isLoading}>
                {weekDays.map(day => (
                  <option key={day.value} value={day.value}>
                    {day.label}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl isInvalid={!!errors.hours?.[index]?.startHour}>
              <Input type="time" {...register(`hours.${index}.startHour`)} isDisabled={isLoading} />
            </FormControl>

            <IconButton
              aria-label="Remover horário"
              icon={<FiTrash />}
              onClick={() => onRemoveHour(index)}
              variant="ghost"
              colorScheme="red"
              isDisabled={isLoading}
            />
          </Flex>
        ))}

        <Button leftIcon={<FiPlus />} onClick={onAppendHour} variant="ghost" size="sm" isDisabled={isLoading}>
          Adicionar horário
        </Button>

        <SimpleGrid columns={2} spacing={4}>
          <Button type="submit" colorScheme="blue" isLoading={isLoading}>
            {edit ? 'Atualizar' : 'Criar'} Turma
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
