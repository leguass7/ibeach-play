import React from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'

import { PrimaryButton } from '@/components/Buttons/PrimaryButton'
import { PasswordInput } from '@/components/Inputs/PasswordInput'
import { FormChangePasswordSchema, type FormChangePasswordData } from '@/services/api/me'
import { meChangePass } from '@/services/api/me/me.api'
import { Box, Stack } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'

type Props = {
  disabled?: boolean
}

export const FormChangePassword: React.FC<Props> = ({ disabled }) => {
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

  const onSubmit: SubmitHandler<FormChangePasswordData> = async data => {
    const response = await meChangePass(data)
    if (response?.success) reset()
  }

  return (
    <Box maxW={{ base: '90%', md: '450px', lg: '450px' }} bg={'gray'}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack justify={'center'} align={'center'} spacing={8} padding={{ base: 1, md: 6 }}>
          <PasswordInput
            errorMessage={errors?.password?.message}
            disabled={!!isSubmitting}
            autoComplete={'new-password'}
            placeholder="Digite sua senha"
            {...register('password')}
          />
          <PasswordInput
            errorMessage={errors?.confirmPassword?.message}
            disabled={!!isSubmitting}
            autoComplete={'new-password'}
            placeholder="Confirme sua senha"
            {...register('confirmPassword')}
          />
          <PrimaryButton fontWeight={700} rounded="full" height={12} fontSize={16} type="submit" width="full" isLoading={!!isSubmitting}>
            Salvar
          </PrimaryButton>
        </Stack>
      </form>
    </Box>
  )
}
