/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

/**
 * Takes an async function and tracks resolution as a boolean.
 *
 * @see https://dataclient.io/docs/api/useLoading
 * @param func A function returning a promise
 * @param deps Deps list sent to useCallback()
 * @example
 ```
 function Button({ onClick, children, ...props }) {
   const [clickHandler, loading] = useLoading(onClick);
   return (
     <button onClick={clickHandler} {...props}>
       {loading ? 'Loading...' : children}
     </button>
   );
 }
 ```
 */
export default function useLoading<F extends (...args: any) => Promise<any>>(func: F, deps?: readonly any[]): [F, boolean, Error | undefined] {
  const isMountedRef = React.useRef(true)
  const [loading, setLoading] = React.useState(false)
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

  return [wrappedFunc as any, loading, error]
}
