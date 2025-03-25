import React from 'react'

import { AlertModal } from './AlertModal'
import { useAlert } from './useAlert'

export type AlertProviderProps = {
  children?: React.ReactNode
}

export const AlertProvider: React.FC<AlertProviderProps> = ({ children }) => {
  const { alert, closeAlert } = useAlert()

  const onClose = React.useCallback(() => {
    closeAlert()
  }, [closeAlert])

  const openAlert = React.useMemo(() => {
    return !!Object.entries(alert || {})?.length
  }, [alert])

  return (
    <>
      {children}
      <AlertModal open={openAlert} onClose={onClose} {...alert} />
    </>
  )
}
