import { tryDate } from '@/helpers/date'
import { PrismaClient, type AccessGroup, type User, type UserAccessGroup } from '@prisma/client'
import { parse } from 'date-fns'

import { loadFile } from './seed-helper'

const prisma = new PrismaClient()

async function users() {
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

async function accessGroup() {
  const data = (await loadFile('access_group.json')) as AccessGroup[]
  await Promise.all(
    data
      .map(({ id, name, createdAt }) => {
        const created = parse(`${createdAt}`, 'yyyy-MM-dd HH:mm:ss', new Date())
        return { id, name, createdAt: created } as AccessGroup
      })
      .map(async d => {
        return prisma.accessGroup.upsert({ where: { id: d.id }, create: d, update: d })
      })
  )
}

async function usersAccessGroup() {
  const data = (await loadFile('users_access_group.json')) as UserAccessGroup[]
  await Promise.all(
    data
      .map(userAccessGroup => {
        return { ...userAccessGroup, createdAt: tryDate(userAccessGroup.createdAt) } as UserAccessGroup
      })
      .map(async userAccessGroup => {
        return prisma.userAccessGroup.upsert({
          where: { userId_groupId: { userId: userAccessGroup.userId, groupId: userAccessGroup.groupId } },
          create: userAccessGroup,
          update: userAccessGroup
        })
      })
  )
}

async function main() {
  await users()
  await accessGroup()
  await usersAccessGroup()
}

main()
  .then(async () => {
    console.error('FIM')
    await prisma.$disconnect()
  })
  .catch(async e => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
