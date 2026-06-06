'use client'
import React, { useEffect, useState } from 'react'

import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button } from '@chakra-ui/react'

export type CloseHandler = () => void
export type ConfirmHandler<T = unknown> = (closeCallback?: CloseHandler) => Promise<T | void> | T | void

export type AlertDialogBaseProps = {
  open: boolean
  onClose: () => void
  onCancel?: () => void
  title?: string
  description?: React.ReactNode
  type?: 'warning' | 'success' | 'error' | 'info'
  textOk?: string
  textCancel?: string
  loading?: boolean
  onConfirm?: ConfirmHandler
  hideButtonCancel?: boolean
  hideButtonOk?: boolean
  timerClose?: number
  children?: React.ReactNode
  id?: string | number
  isCheckbox?: boolean
  labelCheckbox?: string
}

const colors = {
  warning: 'yellow',
  success: 'green',
  error: 'red',
  info: 'blue'
} as const

const noop = () => {}

export const AlertDialogBase: React.FC<AlertDialogBaseProps> = ({
  children,
  description,
  hideButtonCancel,
  hideButtonOk,
  loading,
  onCancel,
  onClose,
  onConfirm,
  open,
  textCancel,
  textOk,
  timerClose,
  title,
  type
}) => {
  const cancelRef = React.useRef<HTMLButtonElement>(null)
  const [working, setWorking] = useState(false)

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    if (timerClose && open) {
      timer = setTimeout(onClose, timerClose)
    }
    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [timerClose, open, onClose])

  const handleConfirm = React.useCallback(async () => {
    if (onConfirm) {
      setWorking(true)
      await onConfirm?.(onClose || noop)
      setWorking(false)
    } else if (onClose) onClose?.()
  }, [onClose, onConfirm])

  const handleCancel = React.useCallback(() => {
    if (onCancel) onCancel?.()
    else if (onClose) onClose?.()
  }, [onClose, onCancel])

  const disabled = !!working || !!loading

  return (
    <AlertDialog isOpen={!!open} onClose={onClose} leastDestructiveRef={cancelRef}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          {title ? (
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {title}
            </AlertDialogHeader>
          ) : null}
          {description ? <AlertDialogBody>{description}</AlertDialogBody> : null}
          {children}
          <AlertDialogFooter gap={3}>
            {hideButtonOk ? null : (
              <Button colorScheme={colors[type || 'info']} onClick={handleConfirm} isLoading={disabled}>
                {textOk || 'Confirma'}
              </Button>
            )}
            {hideButtonCancel ? null : (
              <Button ref={cancelRef} onClick={handleCancel} isDisabled={disabled}>
                {textCancel || 'Cancelar'}
              </Button>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}
