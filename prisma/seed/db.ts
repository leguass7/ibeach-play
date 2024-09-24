import { tryDate } from '@/helpers/date'
import { PrismaClient } from '@prisma/client'
import { parse } from 'date-fns'

export const prisma = new PrismaClient()

export function dateToPrisma(date?: string | Date | null): Date | null {
  if (date && typeof date === 'string') parse(`${date}`, 'yyyy-MM-dd HH:mm:ss', new Date())
  const result = tryDate(date)
  return result ? parse(`${date}`, 'yyyy-MM-dd HH:mm:ss', new Date()) : null
}
