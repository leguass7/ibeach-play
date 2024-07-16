import { PrismaClient, type User } from '@prisma/client'
import { parse } from 'date-fns'
import path from 'node:path'
import fs from 'node:fs/promises'

const prisma = new PrismaClient()

async function loadFile(fileName: string) {
  const filePath = path.resolve(__dirname, 'provision', fileName)
  const buffer = await fs.readFile(filePath)
  const jsonData = buffer.toString()
  const [, , data] = JSON.parse(jsonData)
  return data?.data
}

async function main() {
  const data = (await loadFile('users.json')) as User[]
  console.log('Implementar seed', data)

  await Promise.all(
    data
      .map(({ id, birday, lastAcess, emailVerified, ...user }) => {
        const b = birday ? parse(`${birday}`, 'yyyy-MM-dd', new Date()) : null
        const a = birday ? parse(`${lastAcess}`, 'yyyy-MM-dd HH:mm:ss', new Date()) : null
        const e = emailVerified ? parse(`${emailVerified}`, 'yyyy-MM-dd HH:mm:ss', new Date()) : null
        return { ...user, birday: b, lastAcess: a, emailVerified: e } as User
      })
      .map(async user => {
        return prisma.user.upsert({ where: { email: user.email }, create: user, update: user })
      })
  )
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
