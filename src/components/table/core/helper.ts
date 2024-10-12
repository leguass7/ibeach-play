import { isDefined, isObject } from '@/helpers/validation'

import type { PaginationParams, TableRecord } from './interface'

const paginationProps = ['page', 'size', 'order', 'orderby']

export function stringOrNumber(value: unknown): string | number {
  if (typeof value === 'number') return value
  if (typeof value === 'string') return value
  if (typeof value === 'boolean') return value ? '1' : '0'
  return `${value}`
}

export function extractPaginateProps(obj: TableRecord = {}): PaginationParams {
  if (isObject(obj)) {
    const result = Object.entries(obj).reduce((acc, [key, value]) => {
      if (paginationProps.includes(key) && isDefined(value)) {
        acc[key] = stringOrNumber(value)
      }
      return acc
    }, {} as PaginationParams)
    return result
  }
  return {} as PaginationParams
}

export function onlyDefined(obj: TableRecord = {}) {
  if (isObject(obj)) {
    return Object.entries(obj).reduce((acc, [key, value]) => {
      if (isDefined(value)) acc[key] = value
      return acc
    }, {} as TableRecord)
  }
  return {} as TableRecord
}
