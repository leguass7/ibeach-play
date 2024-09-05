import React from 'react'

import bgDefault from '@/assets/login-bg-default.png'
import { LoginForm } from '@/components/Forms/LoginForm'
import { Box, Flex, HStack, Image, Link, Stack, Text, useBreakpointValue } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

type Props = {
  recaptchaSiteKey?: string
}

const LoginPage: NextPage<Props> = () => {
  const { data } = useSession()
  const navigation = useRouter()

  const isImageVisible = useBreakpointValue({ base: false, md: true })

  if (data?.user?.id) navigation.push('/')

  return (
    <Flex width="100vw" height="100vh">
      {isImageVisible && (
        <Box flex="1">
          <Image src={bgDefault.src} alt="Imagem" objectFit="cover" width="100%" height="100%" />
        </Box>
      )}
      <Flex flex="1" flexDirection="column" justifyContent="center" alignItems="center" bg="secondary.300">
        <Stack width={'full'} flexDir="column" mb="2" justifyContent="center" alignItems="center">
          <Box minW={{ base: '90%', md: '450px' }}>
            <LoginForm />
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
