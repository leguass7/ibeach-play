import React from 'react'

import bgDefault from '@/assets/bg-app.jpg'
import useMobile from '@/hooks/useMobile'
import { Box, Container } from '@chakra-ui/react'

import { Footer, type FooterResizeHandler } from './Footer'
import { Header } from './Header'
import { MainContainer } from './MainContainer'

type Props = {
  children: React.ReactNode
}

export const LayoutContainer: React.FC<Props> = ({ children }) => {
  const [footerHeight, setFooterHeight] = React.useState<number>(32)
  const { isMobile } = useMobile()

  const handleResizeFooter = React.useCallback<FooterResizeHandler>(({ height }) => {
    setFooterHeight(height || 0)
  }, [])

  return (
    <Box
      display="flex"
      flexDirection="column"
      minH="100vh"
      backgroundImage={`url(${bgDefault.src})`}
      backgroundSize="cover"
      backgroundPosition={isMobile ? 'center' : 'center left'}
      backgroundRepeat="no-repeat"
    >
      <Header />
      <Container maxW="container.xl" minH={`calc(100vh - ${footerHeight}px)`} style={{ animation: 'all ease-in-out 0.2s' }}>
        <MainContainer>{children}</MainContainer>
      </Container>
      <Footer onResize={handleResizeFooter} />
    </Box>
  )
}
