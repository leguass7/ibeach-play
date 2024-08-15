import type { User as PrismaUser } from '@prisma/client'
import type { NextApiHandler } from 'next'
import type { AuthOptions, Awaitable, DefaultSession, User } from 'next-auth'
import NextAuth from 'next-auth'
import type { DefaultJWT } from 'next-auth/jwt'
import AzureAd from 'next-auth/providers/azure-ad'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'

import { azureSecrets, googleSecrets, secret } from '~/config'
import { CustomAdapter } from '~/database/CustomAdapter'
import { accountRepository } from '~/use-cases/account'
import { sessionRepository } from '~/use-cases/session'
import { userAuthService, userRepository } from '~/use-cases/user'
import { verificationTokenRepository } from '~/use-cases/verification-token'

type Credentials = Record<'email' | 'password', string>
// const authorizationUrl = 'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code'
const maxAge = 30 * 24 * 60 * 60 // 30 days

// interface U extends User {
declare module 'next-auth' {
  interface Session {
    groups?: number[]
    user: {
      id?: number
    } & DefaultSession['user']
  }

  interface User extends Partial<Omit<PrismaUser, 'id'>> {
    id?: number
  }

  // interface Account extends Partial<Omit<PrismaAccount, 'userId'>> {
  //   // userId?: number
  // }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    groups: number[]
  }
}

const options: AuthOptions = {
  secret,
  session: { strategy: 'jwt', maxAge },
  jwt: { secret, maxAge },
  pages: { signIn: '/login' },
  providers: [
    AzureAd(azureSecrets),
    GoogleProvider({
      ...googleSecrets,
      authorization: { params: { prompt: 'consent', access_type: 'offline', response_type: 'code' } }
    }),
    CredentialsProvider({
      id: 'custom',
      name: 'custom',
      credentials: { email: { type: 'email', label: 'e-mail' }, password: { type: 'password', label: 'senha' } },
      async authorize(credentials, _req) {
        const { email, password } = credentials as Credentials
        const user = await userAuthService.checkCredentials(email, password)
        return (user as Awaitable<User>) || null
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      const u = await userAuthService.getUserCredentials(user?.id || token?.sub)
      token.groups = u?.accessGroups?.map(g => g.groupId) || []
      return token
    },

    async session({ session, token }) {
      // Send properties to the client, like an access_token and user id from a provider.
      session.groups = token?.groups || []
      return session
    }

    // async signIn({ account }) {
    //   if (account.provider === 'google') {
    //     // return profile.email_verified && profile.email.endsWith('@example.com')
    //     return true
    //   }
    //   return true // Do different verification for other providers that don't have `email_verified`
    // }
  },
  debug: true
}

const authHandler: NextApiHandler = async (req, res) => {
  const [opt] = await createOAuthOptions()
  return NextAuth(req, res, opt)
}

export default authHandler

export async function createOAuthOptions(): Promise<[AuthOptions]> {
  const opt = { ...options } as AuthOptions
  opt.adapter = CustomAdapter(userRepository, accountRepository, sessionRepository, verificationTokenRepository)
  return [opt]
}
