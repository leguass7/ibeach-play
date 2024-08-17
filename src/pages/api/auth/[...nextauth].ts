import { createOAuthOptions } from '@/@server-side/use-cases/auth/auth.options'
import type { NextApiHandler } from 'next'
import NextAuth from 'next-auth'

const authHandler: NextApiHandler = async (req, res) => {
  const [opt] = await createOAuthOptions()
  return NextAuth(req, res, opt)
}

export default authHandler
