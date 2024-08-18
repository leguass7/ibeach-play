import bgDefault from '@/assets/bg-default.png'
import { Box, Container } from '@chakra-ui/react'

import { Footer } from '../Footer'
import { Header } from '../Header'
import { MainContainer } from '../MainContainer'

type Props = {
  children: React.ReactNode
}

export const LayoutContainer: React.FC<Props> = ({ children }) => (
  <Box
    display="flex"
    flexDirection="column"
    minH="100vh"
    backgroundImage={`url(${bgDefault.src})`}
    backgroundSize="cover"
    backgroundPosition="center left"
    backgroundRepeat="no-repeat"
  >
    <Box zIndex={1000} width={'100%'} position={'absolute'} top={0}>
      <Header />
    </Box>
    <Container maxW="container.xl">
      <MainContainer>{children}</MainContainer>
    </Container>
    <Footer />
  </Box>
)
