/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type RecentItem = {
  id: string | number
  name: string
  description?: string
}

export interface IAppRecentState {
  readonly arena: RecentItem[]
  readonly person: RecentItem[]
}

export type IAppRecentStateKey = keyof IAppRecentState

const initialState: IAppRecentState = {
  arena: [],
  person: []
}

const slice = createSlice({
  initialState,
  name: '@recent',
  reducers: {
    clearAppRecent: state => {
      const ignore = ['propname']
      Object.keys(initialState).forEach(k => {
        const key = k as IAppRecentStateKey
        // @ts-ignore
        if (!ignore.includes(key)) state[key] = initialState[k]
      })
    },
    setAppRecent: (state, { payload }: PayloadAction<Partial<IAppRecentState>>) => {
      Object.keys(payload).forEach(k => {
        const key = k as IAppRecentStateKey
        // @ts-ignore
        state[key] = payload?.[key]
      })
    }
  }
})

export const { clearAppRecent, setAppRecent } = slice.actions
export default slice.reducer
export type SetAppRecentAction = typeof setAppRecent
