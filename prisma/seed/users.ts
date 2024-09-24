import type { User } from '@prisma/client'
import { parse } from 'date-fns'

import { loadFile } from '../seed-helper'
import { prisma } from './db'

export async function users() {
  const data = (await loadFile('users.json')) as User[]
  await Promise.all(
    data
      .map(({ id: _, birday, lastAccess, emailVerified, ...user }) => {
        const b = birday ? parse(`${birday}`, 'yyyy-MM-dd', new Date()) : null
        const a = birday ? parse(`${lastAccess}`, 'yyyy-MM-dd HH:mm:ss', new Date()) : null
        const e = emailVerified ? parse(`${emailVerified}`, 'yyyy-MM-dd HH:mm:ss', new Date()) : null
        return { ...user, birday: b, lastAccess: a, emailVerified: e } as User
      })
      .map(async user => {
        return prisma.user.upsert({ where: { email: user.email }, create: user, update: user })
      })
  )
}
