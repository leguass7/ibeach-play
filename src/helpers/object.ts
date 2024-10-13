import { isObject } from './validation'

export function tryJson<T = unknown>(obj: unknown): T | null {
  try {
    if (typeof obj === 'string') return JSON.parse(obj)
    else if (isObject(obj)) return Object.assign({}, obj) as T
    return null
  } catch {
    return null
  }
}
