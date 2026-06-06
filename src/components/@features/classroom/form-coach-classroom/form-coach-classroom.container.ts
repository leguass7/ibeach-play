'use client'
import React from 'react'
import { useFieldArray, useForm } from 'react-hook-form'

import useFetcher from '@/hooks/useFetcher'
import { useOnceCall } from '@/hooks/useOnceCall'
import type { FormClassroomData } from '@/services/api/classroom'
import { coachGetClassroom } from '@/services/api/coach'
import { useCoachArenaOptions } from '@/services/api/coach/useCoachArenas'
import { useCoachClassroom } from '@/services/api/coach/useCoachClassroom'
import { useToast } from '@chakra-ui/react'

import { FormCoachClassroomView, type FormCoachClassroomViewProps } from './form-coach-classroom'
import { formClassroomInDto, formClassroomOutDto } from './helpers'

export type FormClassroomProps = {
  classroomId?: number
  onSuccess?: () => Promise<void>
  onCancel?: () => void
}

export const FormCoachClassroomContainer: React.FC<FormClassroomProps> = ({ classroomId, onSuccess, onCancel }) => {
  const { store, loading } = useCoachClassroom()
  const [requestData, loadingInit, data] = useFetcher(coachGetClassroom)
  const [requestArenas, loadingArenas, arenaOptions] = useCoachArenaOptions()
  const toast = useToast()

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm<FormClassroomData>({
    defaultValues: { label: '', arenaId: 0, hours: [{ weekDay: 1, startHour: '08:00' }] }
  })

  const { fields, append, remove } = useFieldArray({ control, name: 'hours' })

  React.useEffect(() => {
    if (classroomId && data?.classroom) {
      const formData = formClassroomInDto(data.classroom)
      if (formData) {
        reset(formData)
      }
    }
  }, [classroomId, data?.classroom, reset])

  const fetchInitialData = React.useCallback(async () => {
    await requestArenas()
    if (classroomId && classroomId > 0) await requestData(classroomId)
  }, [classroomId, requestData, requestArenas])

  useOnceCall(fetchInitialData)

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

  const isLoading = loadingInit || loading || loadingArenas
  const edit = !!classroomId && classroomId > 0

  const props: FormCoachClassroomViewProps = {
    formKey: `${data?.classroom?.id}`,
    register,
    control,
    errors,
    fields,
    isLoading,
    loadingArenas,
    edit,
    arenaOptions,
    onSubmit: handleSubmit(handleFormSubmit),
    onCancel,
    onAppendHour: () => append({ weekDay: 1, startHour: '08:00' }),
    onRemoveHour: (index: number) => remove(index)
  }

  return React.createElement(FormCoachClassroomView, props)
}
