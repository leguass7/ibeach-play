import React from 'react'
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

type LoginFormProps = {
  showPassword: boolean
  handleShowClick: () => void
  handleGoogleClick: () => Promise<void>
  handleFacebookClick: () => Promise<void>
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}

export const LoginForm: React.FC<LoginFormProps> = ({ showPassword, handleShowClick, handleGoogleClick, handleFacebookClick, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <Stack justify={'center'} align={'center'} spacing={8} padding={{ base: 1, md: 6 }}>
        <Heading mb={6} color="gray.50">
          Bem-Vindo
        </Heading>
        <FormControl>
          <PrimaryInput type="email" placeholder="Digite seu email" icon={<FaUserAlt color="#ffff" />} />
        </FormControl>
        <FormControl>
          <InputGroup>
            <PrimaryInput type={showPassword ? 'text' : 'password'} placeholder="Digite sua senha" icon={<FaLock color="#ffff" />} />
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
        <PrimaryButton fontWeight={700} rounded="full" height={12} fontSize={16} type="submit" width="full">
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
