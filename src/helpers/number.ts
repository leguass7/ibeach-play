export function tryInteger(n: string | number): number | null {
  if (typeof n === 'number') return n
  try {
    const num = parseInt(n) || null
    return num
  } catch (error) {
    return null
  }
}

export function round(number: number, precision = 4): number {
  if (!number || (number && number === 0)) return 0
  const factor = Math.pow(10, precision)
  const tempNumber = number * factor
  const roundedTempNumber = Math.round(tempNumber)
  return roundedTempNumber / factor
}

export function checkZeroHundred(value: number | string): number {
  const v = +value || 0
  if (!v || v < 0) return 0
  else if (v > 100) return 100
  return v
}

export function sum(...args: number[]): number {
  return args?.length ? args?.map(v => +v || 0)?.reduce((acc, v) => acc + v, 0) : 0
}

export function avg(...args: number[]): number {
  const sumAll = args?.length ? sum(...args) : 0
  return sumAll ? round(sumAll / args?.length, 4) : 0
}

/** return in seconds */
export function calculateEstimatedTime(count: number): number {
  if (!count || count <= 0) return 0
  const estimatedTime = count > 1000 ? round((count / 1000) * 6, 0) : 30
  return estimatedTime
}

export function centsToFloat(value?: number | string): number {
  const num = value ? parseInt(`${value}`, 10) || 0 : 0
  if (!num) return 0
  return round(num / 100, 2)
}

export function tryNumber(value?: number | string, def: number | null = null): number | null {
  return value ? +value || def : def
}
