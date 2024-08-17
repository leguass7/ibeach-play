import '@/styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr'

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <SWRConfig value={{ fetcher: (resource, init) => fetch(resource, init).then(res => res.json()) }}>
      <ChakraProvider>
        <SessionProvider>
          <Component {...pageProps} />
        </SessionProvider>
      </ChakraProvider>
    </SWRConfig>
  )
}

export default App
