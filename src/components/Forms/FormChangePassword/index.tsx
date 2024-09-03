import React from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { FaEye, FaEyeSlash, FaLock } from 'react-icons/fa'

import { PrimaryButton } from '@/components/Buttons/PrimaryButton'
import { PrimaryInput } from '@/components/Inputs/PrimaryInput'
import { FormChangePasswordSchema, type FormChangePasswordData } from '@/services/api/me'
import { meChangePass } from '@/services/api/me/me.api'
import { Box, FormControl, Heading, InputGroup, InputRightElement, Stack } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'

type Props = {
  disabled?: boolean
}

export const FormChangePassword: React.FC<Props> = ({ disabled }) => {
  const [showPassword, setShowPassword] = React.useState(false)

  const handleShowClick = () => setShowPassword(old => !old)

  const onSubmit: SubmitHandler<FormChangePasswordData> = async data => {
    const response = await meChangePass(data)
    console.log('response', response)
    if (!response?.success) {
      //
    }
    return false
  }

  const {
    register,
    handleSubmit,
    formState: { errors: _, isSubmitting }
  } = useForm<FormChangePasswordData>({ resolver: zodResolver(FormChangePasswordSchema), disabled: !!disabled })

  const renderEye = React.useCallback(() => {
    return (
      <InputRightElement height="100%" display="flex" alignItems="center">
        <Box onClick={handleShowClick} cursor="pointer">
          {showPassword ? <FaEyeSlash color="#ffff" fontSize="18px" /> : <FaEye color="#ffff" fontSize="18px" />}
        </Box>
      </InputRightElement>
    )
  }, [showPassword])

  return (
    <Box maxW={{ base: '90%', md: '450px', lg: '450px' }} bg={'gray'}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack justify={'center'} align={'center'} spacing={8} padding={{ base: 1, md: 6 }}>
          <Heading mb={6} color="black">
            Torcar senha
          </Heading>
          <FormControl>
            <InputGroup>
              <PrimaryInput
                disabled={!!isSubmitting}
                autoComplete={'new-password'}
                type={showPassword ? 'text' : 'password'}
                placeholder="Digite sua senha"
                icon={<FaLock color="#ffff" />}
                {...register('password')}
              />
              {renderEye()}
            </InputGroup>
          </FormControl>
          <FormControl>
            <InputGroup>
              <PrimaryInput
                disabled={!!isSubmitting}
                autoComplete={'new-password'}
                type={showPassword ? 'text' : 'password'}
                placeholder="Confirme sua senha"
                icon={<FaLock color="#ffff" />}
                {...register('confirmPassword')}
              />
              {renderEye()}
            </InputGroup>
          </FormControl>
          <PrimaryButton fontWeight={700} rounded="full" height={12} fontSize={16} type="submit" width="full" disabled={!!isSubmitting}>
            Salvar
          </PrimaryButton>
        </Stack>
      </form>
    </Box>
  )
}
