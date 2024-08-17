import { appName } from '@/config'
import createWebStorage from 'redux-persist/lib/storage/createWebStorage'

const isServer = typeof window === 'undefined'

function createNoopStorage() {
  return {
    getItem(_key: string) {
      return Promise.resolve(null)
    },
    removeItem(_key: string) {
      return Promise.resolve()
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setItem(_key: string, value: any) {
      return Promise.resolve(value)
    }
  }
}

export function createStorage() {
  const storage = isServer ? createNoopStorage() : createWebStorage('local')
  return storage
}

export const persistConfig = {
  // blacklist: ['credit'],
  key: `store-${appName}`,
  storage: createStorage(),
  whitelist: ['theme', 'user', 'auth', 'app']
}
