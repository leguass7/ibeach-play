import { useBreakpointValue } from '@chakra-ui/react'

const useMobile = () => {
  const isMobile = useBreakpointValue({ base: true, md: false })
  return { isMobile }
}

export default useMobile
