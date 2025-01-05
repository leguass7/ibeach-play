import { tryJson } from '@/helpers/object'
import { capitalize } from '@/helpers/string'
import { isDefined, isObject } from '@/helpers/validation'

import type { ITableColumn, PaginationParams, TableRecord } from './interface'

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

export function automaticColumns<R = TableRecord>(records: R[] = []) {
  const columns: Array<Partial<ITableColumn<R>>> = []
  const hasColumn = (key: string) => columns.some(column => column.name === key)

  records.forEach(record => {
    Object.keys(record || {}).forEach(key => {
      if (!hasColumn(key)) {
        const k = key as keyof R
        columns.push({ name: k, label: capitalize(key) })
      }
    })
  })

  console.log('columns', columns)
  return columns
}

export function protectedCellContent(content?: unknown) {
  if (!content) return ''
  if (['string', 'number'].includes(typeof content)) return content
  if (content instanceof Date) return content.toLocaleString()
  if (Array.isArray(content)) return JSON.stringify(content)
  return tryJson(content)
}
