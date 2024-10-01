/* eslint-disable @typescript-eslint/no-explicit-any */
export type GerericClick<E = HTMLElement> = (event?: React.MouseEvent<E>, ...any: any[]) => any
export type GerericFunction = (...any: any[]) => any

export function clickWhithStop<T = HTMLElement>(fn: GerericClick<T>, callback?: GerericFunction, wait?: boolean) {
  const resolver: React.MouseEventHandler<T> = async (e, ...args) => {
    e.preventDefault()
    e.stopPropagation()
    if (fn) {
      if (wait) await fn(e, ...args)
      else fn(e, ...args)
    }
    if (callback) callback?.()
  }

  return resolver
}
