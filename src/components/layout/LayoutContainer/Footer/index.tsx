'use client'

import React from 'react'
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'
import { useResizeDetector, type OnResizeCallback } from 'react-resize-detector'

import { Container, Stack, Text, VStack } from '@chakra-ui/react'

import { SocialButton } from './SocialButton'

export type FooterResizeHandler = OnResizeCallback
export type FooterProps = {
  onResize?: OnResizeCallback
  socialLinks?: {
    label: string
    href: string
  }[]
}

export const Footer: React.FC<FooterProps> = ({ socialLinks, onResize }) => {
  const { ref } = useResizeDetector({ refreshMode: 'debounce', refreshRate: 300, onResize })
  return (
    <VStack bg={'gray.900'} ref={ref}>
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
