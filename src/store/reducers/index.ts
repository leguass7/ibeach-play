import { combineReducers } from 'redux'

import app from './app'

export const rootReducer = combineReducers({
  app
  // theme,
  // user
})

export * from './app'
