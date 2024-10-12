/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

export default function useFetcher<F extends (...args: any) => Promise<any>>(
  func: F,
  deps?: readonly any[]
): [F, boolean, Awaited<ReturnType<F>> | null, Error | undefined] {
  const isMountedRef = React.useRef(true)
  const [loading, setLoading] = React.useState(false)
  const [response, setResponse] = React.useState<Awaited<ReturnType<F>> | null>(null)
  const [error, setError] = React.useState<undefined | Error>(undefined)

  React.useEffect(() => {
    isMountedRef.current = true
    return () => {
      isMountedRef.current = false
    }
  }, [])

  const wrappedFunc = React.useCallback(
    async (...args: any) => {
      setLoading(true)
      let ret
      try {
        ret = await func(...args)
        setResponse(ret)
      } catch (e: any) {
        setError(e)
      } finally {
        if (isMountedRef.current) {
          setLoading(false)
        }
      }
      return ret
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deps || [func]
  )

  return [wrappedFunc as any, loading, response, error]
}
