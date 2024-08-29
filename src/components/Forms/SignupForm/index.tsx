import React from 'react'
import { FaEye, FaEyeSlash, FaLock, FaUserAlt } from 'react-icons/fa'
import { MdAlternateEmail } from 'react-icons/md'

import { PrimaryButton } from '@/components/Buttons/PrimaryButton'
import { PrimaryInput } from '@/components/Inputs/PrimaryInput'
import { Box, FormControl, Heading, InputGroup, InputRightElement, Stack } from '@chakra-ui/react'

type SignupFormProps = {
  showPassword: boolean
  handleShowClick: () => void
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}

export const SignupForm: React.FC<SignupFormProps> = ({ showPassword, handleShowClick, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <Stack justify={'center'} align={'center'} spacing={8} padding={6}>
        <Heading mb={2} color="gray.50">
          Cadastre-se
        </Heading>

        <FormControl>
          <PrimaryInput type="text" placeholder="Nome" icon={<FaUserAlt color="#ffff" />} />
        </FormControl>

        <FormControl>
          <PrimaryInput type="email" placeholder="Email" icon={<MdAlternateEmail color="#ffff" />} />
        </FormControl>

        <FormControl>
          <InputGroup>
            <PrimaryInput type={showPassword ? 'text' : 'password'} placeholder="Crie uma senha" icon={<FaLock color="#ffff" />} />
            <InputRightElement height="100%" display="flex" alignItems="center">
              <Box onClick={handleShowClick} cursor="pointer">
                {showPassword ? <FaEyeSlash color="#ffff" fontSize="18px" /> : <FaEye color="#ffff" fontSize="18px" />}
              </Box>
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <PrimaryButton fontWeight={600} rounded="full" height={12} fontSize={16} type="submit" width="full">
          Criar Conta
        </PrimaryButton>
      </Stack>
    </form>
  )
}
