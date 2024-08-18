import '@/styles/globals.css'
import { Provider as ReduxProvider } from 'react-redux'

import { persistor, store } from '@/store'
import { ChakraProvider } from '@chakra-ui/react'
import type { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import { PersistGate } from 'redux-persist/integration/react'
import { SWRConfig } from 'swr'

type AppPropsWithSession = AppProps & { session?: Session }

const App: React.FC<AppPropsWithSession> = ({ Component, pageProps, session }) => {
  return (
    <ReduxProvider store={store}>
      <PersistGate persistor={persistor}>
        <SWRConfig value={{ fetcher: (resource, init) => fetch(resource, init).then(res => res.json()) }}>
          <ChakraProvider>
            <SessionProvider session={session}>
              <Component {...pageProps} />
            </SessionProvider>
          </ChakraProvider>
        </SWRConfig>
      </PersistGate>
    </ReduxProvider>
  )
}

export default App
