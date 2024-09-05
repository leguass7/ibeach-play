'use client'

import { ReactNode } from 'react'
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'

import { Box, Button, Container, Stack, Text, VisuallyHidden, VStack } from '@chakra-ui/react'

type SocialButtonProps = {
  children: ReactNode
  label: string
  href: string
}

const SocialButton: React.FC<SocialButtonProps> = ({ children, label, href }) => {
  return (
    <Button
      bg={'primary.200'}
      rounded={'full'}
      cursor={'pointer'}
      as={'a'}
      href={href}
      height={'50px'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: 'primary.100'
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </Button>
  )
}

type FooterProps = {
  socialLinks?: {
    label: string
    href: string
  }[]
}

export const Footer: React.FC<FooterProps> = ({ socialLinks }) => {
  return (
    <VStack bg={'gray.900'}>
      <Container
        as={Stack}
        maxW={'container.2xl'}
        py={4}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}
      >
        <Text color={'primary.200'}>© 2024 IBeachPlay</Text>
        <Stack direction={'row'} spacing={6}>
          {socialLinks?.map(link => (
            <SocialButton key={link.label} label={link.label} href={link.href}>
              {link.label === 'Twitter' ? <FaTwitter /> : link.label === 'YouTube' ? <FaYoutube /> : <FaInstagram />}
            </SocialButton>
          ))}
          <SocialButton label={'Twitter'} href={'#'}>
            <FaTwitter size={'20px'} />
          </SocialButton>
          <SocialButton label={'YouTube'} href={'#'}>
            <FaYoutube size={'20px'} />
          </SocialButton>
          <SocialButton label={'Instagram'} href={'#'}>
            <FaInstagram size={'20px'} />
          </SocialButton>
        </Stack>
      </Container>
    </VStack>
  )
}
