import { format, isValid, parse, parseISO, parseJSON } from 'date-fns'

import { makeArray } from './array'

export function validDate(date?: Date | string) {
  if (date instanceof Date) return date
  if (typeof date === 'string') {
    const d = parseISO(date)
    return isValid(d) ? d : undefined
  }
  return undefined
}

export function formatDate(date: Date | string, formatString: string) {
  const valid = validDate(date)
  if (valid) return format(valid, formatString)
  return ''
}

type Func = typeof parseJSON

export function tryDate(str?: Date | string | null | number, formats: string | string[] = []): Date | null {
  const supportedList = [
    parseJSON,
    ...makeArray(formats).filter(f => !!f),
    'yyyy-MM-dd HH:mm:ss',
    'dd/MM/yyyy HH:mm:ss',
    'yyyy-MM-dd',
    'dd/MM/yyyy',
    'MM/dd/yyyy'
  ]

  const parsing = (supported: string | Func, value: string) => {
    if (!value) return null
    if (typeof value === 'number') return new Date(value)
    const v = typeof supported === 'function' ? supported(value) : parse(value, supported, new Date())
    return isValid(v) ? v : null
  }

  const trying = (v: string) =>
    supportedList.reduce(
      (acc, supported) => {
        if (!acc) acc = parsing(supported, v)
        return acc
      },
      null as Date | null
    )

  if (typeof str === 'number') return new Date(str)
  return typeof str === 'string' ? trying(str) || null : str || null
}
