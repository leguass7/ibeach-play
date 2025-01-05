'use client'
import React from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { FiPlus, FiTrash } from 'react-icons/fi'

import useFetcher from '@/hooks/useFetcher'
import { useOnceCall } from '@/hooks/useOnceCall'
import { coachGetClassroom, coachStoreClassroom, type StoreClassroomParams } from '@/services/api/coach'
import { Button, FormControl, FormLabel, Input, VStack, SimpleGrid, FormErrorMessage, Select, IconButton, Flex, useToast } from '@chakra-ui/react'

import { hoursToFormArray, weekDays, type FormArrayHours } from './helpers'

type FormData = {
  label: string
  arenaId: number
  hours: FormArrayHours
}

export type FormClassroomProps = {
  classroomId?: number
  onSuccess?: () => Promise<void>
}

export const FormClassroom: React.FC<FormClassroomProps> = ({ classroomId, onSuccess }) => {
  const [requestData, loadingInit, data] = useFetcher(coachGetClassroom)
  const [requestStore, loadingStore] = useFetcher(coachStoreClassroom)
  const toast = useToast()

  const fetchInitialData = React.useCallback(async () => {
    if (classroomId) requestData(classroomId)
  }, [classroomId, requestData])

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      label: data?.classroom?.label || '',
      arenaId: data?.classroom?.arenaId,
      hours: hoursToFormArray(data?.classroom?.hours) || [{ weekDay: 1, startHour: '08:00' }]
    }
  })

  const { fields, append, remove } = useFieldArray({ control, name: 'hours' })

  const handleFormSubmit = async (formData: FormData) => {
    const payload: StoreClassroomParams = { ...formData, classroomId }

    const response = await requestStore(payload)
    if (response?.success) {
      await onSuccess?.()
    } else {
      toast({
        title: 'Erro ao salvar turma',
        description: response?.message,
        status: 'error',
        duration: 5000,
        isClosable: true
      })
    }
  }

  useOnceCall(fetchInitialData)

  const isLoading = loadingInit || loadingStore

  return (
    <form key={`${classroomId}`} onSubmit={handleSubmit(handleFormSubmit)}>
      <VStack spacing={4} align="stretch">
        <FormControl isInvalid={!!errors.label}>
          <FormLabel>Nome da Turma</FormLabel>
          <Input
            {...register('label', {
              required: 'Nome é obrigatório',
              maxLength: { value: 255, message: 'Máximo de 255 caracteres' }
            })}
          />
          <FormErrorMessage>{errors.label?.message}</FormErrorMessage>
        </FormControl>

        <FormLabel>Horários</FormLabel>
        {fields.map((field, index) => (
          <Flex key={field.id} gap={2}>
            <FormControl isInvalid={!!errors.hours?.[index]?.weekDay}>
              <Select {...register(`hours.${index}.weekDay`)}>
                {weekDays.map(day => (
                  <option key={day.value} value={day.value}>
                    {day.label}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl isInvalid={!!errors.hours?.[index]?.startHour}>
              <Input type="time" {...register(`hours.${index}.startHour`)} />
            </FormControl>

            <IconButton aria-label="Remover horário" icon={<FiTrash />} onClick={() => remove(index)} variant="ghost" colorScheme="red" />
          </Flex>
        ))}

        <Button leftIcon={<FiPlus />} onClick={() => append({ weekDay: 1, startHour: '08:00' })} variant="ghost" size="sm">
          Adicionar horário
        </Button>

        <SimpleGrid columns={2} spacing={4}>
          <Button type="submit" colorScheme="blue" isLoading={isLoading}>
            {classroomId ? 'Atualizar' : 'Criar'} Turma
          </Button>
          <Button variant="ghost">Cancelar</Button>
        </SimpleGrid>
      </VStack>
    </form>
  )
}
