import { tryDate } from '@/helpers/date'
import type { AccessGroup, UserAccessGroup } from '@prisma/client'
import { parse } from 'date-fns'

import { loadFile } from '../seed-helper'
import { prisma } from './db'

export async function accessGroup() {
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

export async function usersAccessGroup() {
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
