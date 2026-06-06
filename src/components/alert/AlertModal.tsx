'use client'
import React, { useEffect, useState } from 'react'

import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button } from '@chakra-ui/react'

import type { IAlert } from './useAlert'

export type AlertModalProps = IAlert & {
  children?: React.ReactNode
  open: boolean
  onClose: () => void
  onCancel?: () => void
  hideButtonOk?: boolean
  timerClose?: number // Add timerClose prop
  labelCheckbox?: string
}

const noop = () => {}

const colors = {
  warning: 'yellow',
  success: 'green',
  error: 'red',
  info: 'blue'
}

export const AlertModal: React.FC<AlertModalProps> = ({
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
    let timer: NodeJS.Timeout
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
      const r = await onConfirm?.(onClose || noop)
      setWorking(false)
      return r
    } else if (onClose) onClose?.()
  }, [onClose, onConfirm])

  const handleCancel = React.useCallback(() => {
    if (onCancel) onCancel?.()
    else if (onClose) onClose?.()
  }, [onClose, onCancel])

  const disabled = React.useMemo(() => !!working || !!loading, [working, loading])

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
              <Button colorScheme={colors?.[type || 'info']} onClick={handleConfirm} isLoading={disabled}>
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
