import React from 'react'
import { FaEye, FaEyeSlash, FaFacebook, FaGoogle, FaLock, FaUserAlt } from 'react-icons/fa'

import bgDefault from '@/assets/login-bg-default.png'
import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormHelperText,
  HStack,
  Heading,
  IconButton,
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
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const CFaUserAlt = chakra(FaUserAlt)
const CFaLock = chakra(FaLock)

type Props = {
  recaptchaSiteKey?: string
}

const LoginPage: NextPage<Props> = () => {
  const [showPassword, setShowPassword] = React.useState(false)
  const { data } = useSession()
  const navigation = useRouter()

  const handleShowClick = () => setShowPassword(!showPassword)

  const handleGoogleClick = async () => {
    await signIn('google')
  }

  const handleFacebookClick = async () => {
    await signIn('facebook')
  }

  const isImageVisible = useBreakpointValue({ base: false, md: true })

  if (data?.user?.id) navigation.push('/')

  return (
    <Flex width="100vw" height="100vh">
      {isImageVisible && (
        <Box flex="1">
          <Image src={bgDefault.src} alt="Imagem" objectFit="cover" width="100%" height="100%" />
        </Box>
      )}

      <Flex flex="1" flexDirection="column" justifyContent="center" alignItems="center" bg="secondary.50">
        <Stack width={'full'} flexDir="column" mb="2" justifyContent="center" alignItems="center">
          <Box minW={{ base: '90%', md: '450px' }}>
            <form>
              <Stack justify={'center'} align={'center'} spacing={8} padding={{ base: 1, md: 6 }}>
                <Heading mb={6} color="gray.50">
                  Bem-Vindo
                </Heading>
                <FormControl>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <CFaUserAlt color="gray.300" />
                    </InputLeftElement>
                    <Input
                      type="email"
                      placeholder="Digite seu email"
                      borderColor="primary.100"
                      focusBorderColor="primary.100"
                      rounded="2xl"
                      height={12}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none" color="gray.300">
                      <CFaLock color="gray.300" />
                    </InputLeftElement>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Digite sua senha"
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
                  <FormHelperText textAlign="right">
                    <Link color={'gray.300'}>Esqueceu a senha?</Link>
                  </FormHelperText>
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
                  Entrar
                </Button>

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
          </Box>
        </Stack>
        <HStack justify={'center'} align={'center'} width={'100%'}>
          <Text textColor={'primary.100'}>Primeira vez aqui? </Text>
          <Link color="gray.50" href="/register">
            Cadastre-se
          </Link>
        </HStack>
      </Flex>
    </Flex>
  )
}

export default LoginPage
