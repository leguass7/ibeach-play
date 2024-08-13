/* eslint-disable @typescript-eslint/no-explicit-any */
import { tryDate } from './date'

/**
 * Simple object check.
 */
export function isObject(item: any): boolean {
  return item && typeof item === 'object' && !Array.isArray(item) && !(item instanceof Date)
}

export function isObjectEmpty(obj: object = {}): boolean {
  if (!obj) return true
  return !Object.keys(obj).length
}

export function isObjectValues(obj: object = {}): boolean {
  return !!(isObject(obj) && !!Object.values(obj).filter(f => !!f)?.length)
}

export function isObjectValuesEmpty(obj: object = {}): boolean {
  return !Object.values(obj)?.filter(f => isDefined(f))?.length
}

export function isDefined(v: any): boolean {
  return !!(v !== null && typeof v !== 'undefined')
}

export function isNullableDefined(v: any): boolean {
  return !!(isDefined(v) || v === null)
}

export function isNull(v: any): boolean {
  return !!(v === null)
}

// export function isEmailAddr(email?: string): boolean {
//   if (!email) return false;
//   const emailSchema = Joi.object({ email: Joi.string().email().optional() });
//   const isEmail = !emailSchema.validate({ email })?.error;
//   return isEmail;
// }

/**
 * Solução temporária para validar a presença de instancias no contrutor de classes de serviço
 */
export function classConstructorValidate(prefix: string, validate: Record<string, any> = {}) {
  Object.keys(validate).forEach(key => {
    if (!validate?.[key]) throw new Error(`${prefix} !${key}`)
  })
}

export type StartAndEndDate = {
  success: boolean
  startDate?: Date
  endDate?: Date
}
export function startAndEndDate(startDate?: Date | string, endDate?: Date | string): StartAndEndDate {
  const result: StartAndEndDate = { success: false }
  const dateLimit = new Date(2000, 1, 1)

  const d1 = startDate ? tryDate(startDate) : undefined
  const d2 = endDate ? tryDate(endDate) : undefined

  if (d1 && d2 && d1 > d2) return result

  if (d1 && d1 >= dateLimit) result.startDate = d1
  if (d2 && d2 >= dateLimit) result.endDate = d2
  result.success = true
  return result
}
