'use client'
import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { FaEye, FaEyeSlash, FaLock, FaUserAlt, FaGoogle, FaFacebook } from 'react-icons/fa'

import { PrimaryButton } from '@/components/Buttons/PrimaryButton'
import { PrimaryInput } from '@/components/Inputs/PrimaryInput'
import {
  FormControl,
  FormHelperText,
  Heading,
  InputGroup,
  InputRightElement,
  Stack,
  Divider,
  HStack,
  Box,
  Text,
  IconButton,
  Link,
  Flex
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'

import { FormSiginSchema, type FormSiginData } from './login.validation'

export type { FormSiginData }
export { FormSiginSchema }

const defaultValues: FormSiginData = { email: '', password: '' }

export type LoginFormProps = {
  onSuccess?: () => void
}

export const LoginForm: React.FC<LoginFormProps> = () => {
  const [showPassword, setShowPassword] = React.useState(false)

  const handleShowClick = () => setShowPassword(old => !old)

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
    console.log('response', response)
    return false
  }

  console.log('errors', errors)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack justify={'center'} align={'center'} spacing={8} padding={{ base: 1, md: 6 }}>
        <Heading mb={6} color="gray.50">
          Bem-Vindo
        </Heading>
        <FormControl>
          <PrimaryInput id={'email'} type="email" placeholder="Digite seu email" icon={<FaUserAlt color="#ffff" />} {...register('email')} />
        </FormControl>
        <FormControl>
          <InputGroup>
            <PrimaryInput
              type={showPassword ? 'text' : 'password'}
              placeholder="Digite sua senha"
              icon={<FaLock color="#ffff" />}
              {...register('password')}
            />
            <InputRightElement height="100%" display="flex" alignItems="center">
              <Box onClick={handleShowClick} cursor="pointer">
                {showPassword ? <FaEyeSlash color="#ffff" fontSize="18px" /> : <FaEye color="#ffff" fontSize="18px" />}
              </Box>
            </InputRightElement>
          </InputGroup>
          <FormHelperText textAlign="right">
            <Link color={'gray.300'}>Esqueceu a senha?</Link>
          </FormHelperText>
        </FormControl>
        <PrimaryButton fontWeight={700} rounded="full" height={12} fontSize={16} type="submit" width="full" disabled={!!isSubmitting}>
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
