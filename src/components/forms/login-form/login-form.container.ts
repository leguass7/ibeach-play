import React from 'react'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'

import { LoginFormView, type LoginFormViewProps } from './login-form'
import { FormSiginSchema, type FormSiginData } from './login.validation'

const defaultValues: FormSiginData = { email: '', password: '' }

export type LoginFormProps = {
  onSuccess?: () => void
}

export const LoginFormContainer: React.FC<LoginFormProps> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FormSiginData>({ defaultValues, resolver: zodResolver(FormSiginSchema) })

  const onGoogleClick = async () => {
    await signIn('google')
  }

  const onFacebookClick = async () => {
    await signIn('facebook')
  }

  const handleFormSubmit = async (data: FormSiginData) => {
    await signIn('credentials', { redirect: false, ...data })
  }

  const props: LoginFormViewProps = {
    register,
    errors,
    isSubmitting,
    onSubmit: handleSubmit(handleFormSubmit),
    onGoogleClick,
    onFacebookClick
  }

  return React.createElement(LoginFormView, props)
}
