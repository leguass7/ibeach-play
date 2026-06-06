import React from 'react'
import type { FieldErrors, UseFormRegister } from 'react-hook-form'

import { PasswordInput } from '@/components/ui/password-input'
import { PrimaryButton } from '@/components/ui/primary-button'
import type { FormChangePasswordData } from '@/services/api/me'
import { Box, Stack } from '@chakra-ui/react'

export type FormChangePasswordViewProps = {
  register: UseFormRegister<FormChangePasswordData>
  errors: FieldErrors<FormChangePasswordData>
  isSubmitting: boolean
  onSubmit: React.FormEventHandler<HTMLFormElement>
}

export function FormChangePasswordView({ register, errors, isSubmitting, onSubmit }: FormChangePasswordViewProps) {
  return (
    <Box maxW={{ base: '90%', md: '450px', lg: '450px' }} bg={'gray'}>
      <form onSubmit={onSubmit}>
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
