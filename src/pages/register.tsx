import React from 'react'

import bgDefault from '@/assets/login-bg-default.png'
import { SignupForm } from '@/components/Forms/SignupForm'
import { Box, Flex, HStack, Image, Link, Stack, Text, useBreakpointValue } from '@chakra-ui/react'
import type { NextPage } from 'next'

const SignupPage: NextPage = () => {
  const [showPassword, setShowPassword] = React.useState(false)

  const handleShowClick = () => setShowPassword(!showPassword)

  const isImageVisible = useBreakpointValue({ base: false, md: true })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Add form submission logic here
  }

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
            <SignupForm showPassword={showPassword} handleShowClick={handleShowClick} onSubmit={handleSubmit} />
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
