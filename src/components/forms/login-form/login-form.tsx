'use client'
import React from 'react'
import type { FieldErrors, UseFormRegister } from 'react-hook-form'
import { FaFacebook, FaGoogle, FaUserAlt } from 'react-icons/fa'

import { PrimaryInput } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/password-input'
import { PrimaryButton } from '@/components/ui/primary-button'
import { Divider, Flex, FormHelperText, Heading, HStack, IconButton, Link, Stack, Text } from '@chakra-ui/react'

import type { FormSiginData } from './login.validation'

export type LoginFormViewProps = {
  register: UseFormRegister<FormSiginData>
  errors: FieldErrors<FormSiginData>
  isSubmitting: boolean
  onSubmit: React.FormEventHandler<HTMLFormElement>
  onGoogleClick: () => void
  onFacebookClick: () => void
}

export function LoginFormView({ register, errors, isSubmitting, onSubmit, onGoogleClick, onFacebookClick }: LoginFormViewProps) {
  return (
    <form onSubmit={onSubmit}>
      <Stack justify={'center'} align={'center'} spacing={8} padding={{ base: 1, md: 6 }}>
        <Heading mb={6} color="gray.50">
          Bem-Vindo
        </Heading>

        <PrimaryInput
          errorMessage={errors?.email?.message}
          disabled={!!isSubmitting}
          type="email"
          placeholder="Digite seu email"
          start={<FaUserAlt color="#ffff" />}
          {...register('email')}
        />
        <PasswordInput
          errorMessage={errors?.password?.message}
          disabled={!!isSubmitting}
          autoComplete={'new-password'}
          placeholder="Digite sua senha"
          {...register('password')}
        >
          <FormHelperText textAlign="right">
            <Link hidden={isSubmitting} color={'gray.300'}>
              Esqueceu a senha?
            </Link>
          </FormHelperText>
        </PasswordInput>
        <PrimaryButton fontWeight={700} rounded="full" height={12} fontSize={16} type="submit" width="full" isDisabled={!!isSubmitting}>
          Entrar
        </PrimaryButton>

        <Flex align="center" width="full">
          <Divider borderColor="gray.300" />
          <Text mx={2} color="gray.500">
            ou
          </Text>
          <Divider borderColor="gray.300" />
        </Flex>

        <HStack spacing={4}>
          <IconButton
            aria-label="Entrar com Google"
            icon={<FaGoogle fontSize={'22px'} />}
            onClick={onGoogleClick}
            backgroundColor="red.500"
            color={'gray.50'}
            borderRadius="full"
            _hover={{ bgColor: 'red.400' }}
            height={12}
            width={12}
          />
          <IconButton
            aria-label="Entrar com Facebook"
            icon={<FaFacebook fontSize={'22px'} />}
            onClick={onFacebookClick}
            backgroundColor="blue.400"
            color={'gray.50'}
            borderRadius="full"
            _hover={{ bgColor: 'blue.600' }}
            height={12}
            width={12}
          />
        </HStack>
      </Stack>
    </form>
  )
}
