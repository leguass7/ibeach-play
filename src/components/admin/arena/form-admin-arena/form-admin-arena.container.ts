import React from 'react'
import { useForm } from 'react-hook-form'

import useFetcher from '@/hooks/useFetcher'
import { useOnceCall } from '@/hooks/useOnceCall'
import { adminGetArena } from '@/services/api/admin/arena'
import { useAdminArena } from '@/services/api/admin/arena/useAdminArena'
import type { FormArenaData } from '@/services/api/arena'
import { useToast } from '@chakra-ui/react'

import { FormAdminArenaView, type FormAdminArenaViewProps } from './form-admin-arena'
import { formArenaInDto, formArenaOutDto } from './helpers'

export type FormAdminProps = {
  arenaId?: number
  onSuccess?: () => Promise<void>
  onCancel?: () => void
}

export const FormAdminArenaContainer: React.FC<FormAdminProps> = ({ arenaId, onSuccess, onCancel }) => {
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

  React.useEffect(() => {
    if (arenaId && data?.arena) {
      const formData = formArenaInDto(data.arena)
      if (formData) reset(formData)
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

  const props: FormAdminArenaViewProps = {
    formKey: String(data?.arena?.id),
    register,
    errors,
    isLoading: loadingInit || loading,
    edit: !!arenaId && arenaId > 0,
    onSubmit: handleSubmit(handleFormSubmit),
    onCancel
  }

  return React.createElement(FormAdminArenaView, props)
}
