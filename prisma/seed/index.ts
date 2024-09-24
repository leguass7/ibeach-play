import { accessGroup, usersAccessGroup } from './access-group'
import { arenas } from './arena'
import { city, uf } from './cep'
import { prisma } from './db'
import { users } from './users'

async function main() {
  await uf()
  await city()
  await users()
  await accessGroup()
  await usersAccessGroup()
  await arenas()
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
