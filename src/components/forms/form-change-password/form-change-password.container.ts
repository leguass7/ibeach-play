import React from 'react'
import { useForm } from 'react-hook-form'

import { FormChangePasswordSchema, type FormChangePasswordData } from '@/services/api/me'
import { meChangePass } from '@/services/api/me/me.api'
import { zodResolver } from '@hookform/resolvers/zod'

import { FormChangePasswordView, type FormChangePasswordViewProps } from './form-change-password'

type Props = {
  disabled?: boolean
}

export const FormChangePasswordContainer: React.FC<Props> = ({ disabled }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<FormChangePasswordData>({
    resolver: zodResolver(FormChangePasswordSchema),
    disabled: !!disabled,
    resetOptions: { keepDefaultValues: true }
  })

  const handleFormSubmit = async (data: FormChangePasswordData) => {
    const response = await meChangePass(data)
    if (response?.success) reset()
  }

  const props: FormChangePasswordViewProps = {
    register,
    errors,
    isSubmitting,
    onSubmit: handleSubmit(handleFormSubmit)
  }

  return React.createElement(FormChangePasswordView, props)
}
