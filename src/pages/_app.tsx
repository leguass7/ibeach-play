import '@/styles/globals.css'
import { Provider as ReduxProvider } from 'react-redux'

import { AppProviders } from '@/components/AppProviders'
import { persistor, store } from '@/store'
import theme from '@/styles/theme'
import { ChakraProvider } from '@chakra-ui/react'
import type { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import { PersistGate } from 'redux-persist/integration/react'

type AppPropsWithSession = AppProps & { session?: Session }

const App: React.FC<AppPropsWithSession> = ({ Component, pageProps, session }) => {
  return (
    <ReduxProvider store={store}>
      <PersistGate persistor={persistor}>
        <ChakraProvider theme={theme}>
          <AppProviders>
            <SessionProvider session={session}>
              <Component {...pageProps} />
            </SessionProvider>
          </AppProviders>
        </ChakraProvider>
      </PersistGate>
    </ReduxProvider>
  )
}

export default App
