import type { User as PrismaUser } from '@prisma/client'
import type { AuthOptions, Awaitable, DefaultSession } from 'next-auth'
import type { DefaultJWT } from 'next-auth/jwt'
import AzureAd from 'next-auth/providers/azure-ad'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'

import { azureSecrets, googleSecrets, secret } from '~/config'
import { CustomAdapter } from '~/database/CustomAdapter'
import { userAuthService, userRepository } from '~/use-cases/user'

import { accountRepository } from '../account'
import { sessionRepository } from '../session'
import { verificationTokenRepository } from '../verification-token'

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

export const authOptions: AuthOptions = {
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
        return (user as Awaitable<PrismaUser>) || null
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
      session.user.id = +(token?.sub || 0)
      return session
    }
  },
  debug: true
}

export async function createOAuthOptions(): Promise<[AuthOptions]> {
  const opt = { ...authOptions } as AuthOptions
  opt.adapter = CustomAdapter(userRepository, accountRepository, sessionRepository, verificationTokenRepository)
  return [opt]
}
