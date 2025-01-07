'use client'
import React from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { FiPlus, FiTrash } from 'react-icons/fi'

import { SelectArena } from '@/components/Inputs/SelectArena'
import useFetcher from '@/hooks/useFetcher'
import { useOnceCall } from '@/hooks/useOnceCall'
import type { FormClassroomData } from '@/services/api/classroom'
import { coachGetClassroom } from '@/services/api/coach'
import { useCoachClassroom } from '@/services/api/coach/useCoachClassroom'
import {
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  Select,
  SimpleGrid,
  useToast,
  VStack
} from '@chakra-ui/react'

import { formClassroomInDto, formClassroomOutDto, weekDays } from './helpers'

export type FormClassroomProps = {
  classroomId?: number
  onSuccess?: () => Promise<void>
  onCancel?: () => void
}

export const FormCoachClassroom: React.FC<FormClassroomProps> = ({ classroomId, onSuccess, onCancel }) => {
  const { store, loading } = useCoachClassroom()
  const [requestData, loadingInit, data] = useFetcher(coachGetClassroom)
  const toast = useToast()

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm<FormClassroomData>()

  // Fetch inicial dos dados
  const fetchInitialData = React.useCallback(async () => {
    if (classroomId) {
      const response = await requestData(classroomId)
      if (response?.classroom) {
        const formData = formClassroomInDto(response.classroom)
        reset(formData) // Reset do formulário com os dados
      }
    }
  }, [classroomId, requestData, reset])

  const { fields, append, remove } = useFieldArray({ control, name: 'hours' })

  const handleFormSubmit = async (formData: FormClassroomData) => {
    const payload = formClassroomOutDto(formData, classroomId)

    const response = await store(payload)
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
  console.log('data', data)

  const isLoading = loadingInit || loading

  return (
    <form key={`${data?.classroom?.id}`} onSubmit={handleSubmit(handleFormSubmit)}>
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

        <SelectArena
          control={control}
          isRequired
          isDisabled={!!classroomId} // desabilita edição em modo de atualização
        />
        <Divider />

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
          {onCancel ? <Button variant="ghost">Cancelar</Button> : null}
        </SimpleGrid>
      </VStack>
    </form>
  )
}
