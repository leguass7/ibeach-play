import type { Arena, Prisma } from '@prisma/client'
import type { connect } from 'node:http2'

import { loadFile } from '../seed-helper'
import { dateToPrisma, prisma } from './db'

export async function arenas() {
  const data = (await loadFile('arenas.json')) as Arena[]
  await Promise.all(
    data
      .map((data, index) => {
        const id = data?.id || index + 1
        const createdAt = dateToPrisma(data?.createdAt) || new Date()
        const updatedAt = dateToPrisma(data?.updatedAt) || new Date()
        return { ...data, id, createdAt, updatedAt } as Arena
      })
      .map(async ({ userId, cityId, createdBy, ...data }) => {
        const create: Prisma.ArenaCreateInput = {
          name: data.name,
          description: data.description,
          address: data.address,
          phone: data.phone,
          rating: data.rating,
          reviews: data.reviews,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
          city: { connect: { id: cityId } },
          createdUser: { connect: { id: createdBy || userId } },
          user: { connect: { id: userId } }
        }
        return prisma.arena.upsert({
          where: { id: data.id },
          create,
          update: data
        })
      })
  )
}
