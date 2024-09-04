'use client'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FaFacebook, FaGoogle, FaUserAlt } from 'react-icons/fa'

import { PrimaryButton } from '@/components/Buttons/PrimaryButton'
import { PasswordInput } from '@/components/Inputs/PasswordInput'
import { PrimaryInput } from '@/components/Inputs/PrimaryInput'
import { Divider, Flex, FormHelperText, Heading, HStack, IconButton, Link, Stack, Text } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'

import { FormSiginSchema, type FormSiginData } from './login.validation'

export { FormSiginSchema }
export type { FormSiginData }

const defaultValues: FormSiginData = { email: '', password: '' }

export type LoginFormProps = {
  onSuccess?: () => void
}

export const LoginForm: React.FC<LoginFormProps> = () => {
  const handleGoogleClick = async () => {
    await signIn('google')
  }
  const handleFacebookClick = async () => {
    await signIn('facebook')
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FormSiginData>({ defaultValues, resolver: zodResolver(FormSiginSchema) })

  const onSubmit: SubmitHandler<FormSiginData> = async data => {
    const response = await signIn('credentials', { redirect: false, ...data })
    if (!response?.ok) {
      //
    }
    console.log('response', response)
    return false
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
            onClick={handleGoogleClick}
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
            onClick={handleFacebookClick}
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
