import React from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Callback = (...args: any[]) => Promise<any> | any | void

export function useOnceCall(cb: Callback, condition = true) {
  const isCalledRef = React.useRef(false)

  React.useEffect(() => {
    if (condition && !isCalledRef.current) {
      isCalledRef.current = true
      cb()
    }
  }, [cb, condition])
}
