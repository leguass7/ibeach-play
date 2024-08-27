import React from 'react'
import { FaEye, FaEyeSlash, FaLock, FaUserAlt } from 'react-icons/fa'

import bgDefault from '@/assets/login-bg-default.png'
import {
  Box,
  Button,
  Flex,
  FormControl,
  HStack,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Link,
  Stack,
  Text,
  chakra,
  useBreakpointValue
} from '@chakra-ui/react'
import type { NextPage } from 'next'

const CFaUserAlt = chakra(FaUserAlt)
const CFaLock = chakra(FaLock)

const SignupPage: NextPage = () => {
  const [showPassword, setShowPassword] = React.useState(false)

  const handleShowClick = () => setShowPassword(!showPassword)

  const isImageVisible = useBreakpointValue({ base: false, md: true })

  return (
    <Flex width="100vw" height="100vh">
      {isImageVisible && (
        <Box flex="1">
          <Image src={bgDefault.src} alt="Imagem" objectFit="cover" width="100%" height="100%" />
        </Box>
      )}

      <Flex flex="1" flexDirection="column" justifyContent="center" alignItems="center" bg="secondary.50">
        <Stack width={'full'} flexDir="column" mb="2" justifyContent="center" alignItems="center">
          <Box minW={{ base: '100%', md: '450px' }}>
            <form>
              <Stack justify={'center'} align={'center'} spacing={8} padding={6}>
                <Heading mb={2} color="gray.50">
                  Cadastre-se
                </Heading>

                <FormControl>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <CFaUserAlt color="gray.300" />
                    </InputLeftElement>
                    <Input type="text" placeholder="Nome" borderColor="primary.100" focusBorderColor="primary.100" rounded="2xl" height={12} />
                  </InputGroup>
                </FormControl>

                <FormControl>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <CFaUserAlt color="gray.300" />
                    </InputLeftElement>
                    <Input type="email" placeholder="Email" borderColor="primary.100" focusBorderColor="primary.100" rounded="2xl" height={12} />
                  </InputGroup>
                </FormControl>

                <FormControl>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <CFaLock color="gray.300" />
                    </InputLeftElement>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Crie uma senha"
                      borderColor="primary.100"
                      focusBorderColor="primary.100"
                      rounded="2xl"
                      height={12}
                    />
                    <InputRightElement>
                      <Flex position={'absolute'} top={'40%'} right={5} justifyContent={'center'} alignItems={'center'} onClick={handleShowClick}>
                        {showPassword ? <FaEyeSlash color="#ffff" fontSize={'18px'} /> : <FaEye color="#ffff" fontSize={'18px'} />}
                      </Flex>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>

                <Button
                  fontWeight={700}
                  color={'secondary.50'}
                  borderRadius="full"
                  height={12}
                  fontSize={16}
                  type="submit"
                  variant="solid"
                  bgColor="primary.100"
                  width="full"
                  _hover={{ bgColor: 'primary.50' }}
                >
                  Criar Contar
                </Button>
              </Stack>
            </form>
          </Box>
        </Stack>
        <HStack justify={'center'} align={'center'} width={'100%'}>
          <Text textColor={'primary.50'}>Já tem uma conta? </Text>
          <Link color="gray.50" href="login">
            Faça login
          </Link>
        </HStack>
      </Flex>
    </Flex>
  )
}

export default SignupPage
