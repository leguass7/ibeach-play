/* eslint-disable @typescript-eslint/no-explicit-any */
import type React from 'react'

import { create } from 'zustand'

export type CloseHandler = () => any
export type ConfirmHandler<T = any> = (closeCallback?: CloseHandler) => Promise<T | void> | T | void

export interface IAlert {
  id?: string | number
  title?: string
  type?: 'warning' | 'success' | 'error' | 'info'
  description?: React.ReactNode
  textOk?: string
  textCancel?: string
  loading?: boolean
  onConfirm?: ConfirmHandler
  hideButtonCancel?: boolean
  hideButtonOk?: boolean
  timerClose?: number
  onClose?: () => void
  onCancel?: () => void
  isCheckbox?: boolean
  labelCheckbox?: string
}

type AlertContext = {
  alert: IAlert | null
  createAlert: (data: IAlert) => void
  closeAlert: () => void
}

function createAlert(data: IAlert) {
  return (state: AlertContext): AlertContext => {
    return { ...state, alert: data }
  }
}

function closeAlert() {
  return (state: AlertContext): AlertContext => {
    return { ...state, alert: null }
  }
}

export const useAlert = create<AlertContext>(set => ({
  alert: null,
  closeAlert: () => set(closeAlert()),
  createAlert: (data: IAlert) => set(createAlert(data))
}))
