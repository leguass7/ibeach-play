import type { City, Uf } from '@prisma/client'

import { loadFile } from '../seed-helper'
import { prisma } from './db'

export async function uf() {
  const data = (await loadFile('uf.json')) as Uf[]
  await Promise.all(data.map(({ id, name }) => ({ id, name }) as Uf).map(async d => prisma.uf.upsert({ where: { id: d.id }, create: d, update: d })))
}

export async function city() {
  const data = (await loadFile('city.json')) as City[]
  await Promise.all(
    data
      .map(city => {
        return { ...city } as City
      })
      .map(async city => {
        return prisma.city.upsert({
          where: { id: city.id },
          create: city,
          update: city
        })
      })
  )
}
