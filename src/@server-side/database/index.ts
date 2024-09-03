import { PrismaClient } from '@prisma/client'
// import { withOptimize } from '@prisma/extension-optimize'
/**
 * Melhores práticas para o uso do Prisma Client com Next.js
 * @see https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices
 */

declare const globalThis: {
  prismaGlobal: PrismaClientSingleton
} & typeof global

/** Cria instancia do Prisma */
const prismaClientSingleton = () => {
  return new PrismaClient() //.$extends(withOptimize())
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()
export type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma
