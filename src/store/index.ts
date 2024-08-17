import { useDispatch, type TypedUseSelectorHook, useSelector } from 'react-redux'

import { configureStore, type Middleware } from '@reduxjs/toolkit'
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist'

import { persistConfig } from './persist'
import { rootReducer } from './reducers'

const middlewares: Middleware[] = []
const ignoredActions = [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]

const persistedReducer = persistReducer(persistConfig, rootReducer)

function makeStore() {
  return configureStore({
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        immutableCheck: { warnAfter: 500 }, // corrige console.warn (default = 32ms)
        serializableCheck: { ignoredActions, warnAfter: 500 }
      }).concat(...middlewares),
    reducer: persistedReducer
  })
}

const store = makeStore()
const persistor = persistStore(store)

export { store, persistor }

export type MakeStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
