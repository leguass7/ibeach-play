import { combineReducers } from 'redux'

import app, { type IAppState, type SetAppAction, IAppStateKey } from './app'
import recent, { type IAppRecentState, type SetAppRecentAction } from './recent'

const rootReducer = combineReducers({
  app,
  recent
  // theme,
  // user
})

export { rootReducer }

export type { IAppRecentState as IAppDataState, IAppState, IAppStateKey, SetAppAction, SetAppRecentAction as SetAppDataAction }
