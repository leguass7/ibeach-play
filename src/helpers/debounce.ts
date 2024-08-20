/* eslint-disable @typescript-eslint/no-explicit-any */
type FuncionCallback = (...args: any[]) => void

export function debounceEvent(fn: FuncionCallback, wait = 500, time?: any) {
  return (...args: any[]): void => {
    clearTimeout(time)
    time = setTimeout(fn, wait, ...args)
  }
}

export const wait = (timeout: number): Promise<any> => {
  return new Promise(resolve => setTimeout(resolve, timeout))
}
