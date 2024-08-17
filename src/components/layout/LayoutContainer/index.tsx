import { Box } from '@chakra-ui/react'

import { Footer } from '../Footer'
import { Header } from '../Header'
import { MainContainer } from '../MainContainer'

type Props = {
  children: React.ReactNode
}

export const LayoutContainer: React.FC<Props> = ({ children }) => (
  <Box display="flex" flexDirection="column" minH="100vh">
    <Header />
    <MainContainer>{children}</MainContainer>
    <Footer />
  </Box>
)
