/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface IAppState {
  readonly version: string
}

type IAppStateKey = keyof IAppState

const initialState: IAppState = {
  version: '0.0.0'
}

export const slice = createSlice({
  initialState,
  name: '@auth',
  reducers: {
    clearApp: state => {
      const ignore = ['propname']
      Object.keys(initialState).forEach(k => {
        const key = k as IAppStateKey
        // @ts-ignore
        if (!ignore.includes(key)) state[key] = initialState[k]
      })
    },
    setApp: (state, { payload }: PayloadAction<Partial<IAppStateKey>>) => {
      Object.keys(payload).forEach(k => {
        const key = k as IAppStateKey
        // @ts-ignore
        state[key] = payload?.[key]
      })
    }
  }
})

export const { clearApp, setApp } = slice.actions
export default slice.reducer
export type SetAppAction = typeof setApp
