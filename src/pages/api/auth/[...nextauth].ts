import { accountRepository } from '~/use-cases/account'
import { sessionRepository } from '~/use-cases/session'
import { verificationTokenRepository } from '~/use-cases/verification-token'
import type { NextApiHandler } from 'next'
import NextAuth, { type AuthOptions } from 'next-auth'
import AzureAd from 'next-auth/providers/azure-ad'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'

import { googleSecrets, isDevMode, secret, azureSecrets } from '~/config'
import { CustomAdapter } from '~/database/CustomAdapter'
import { userAuthService, userRepository } from '~/use-cases/user'

type Credentials = Record<'email' | 'password', string>
// const authorizationUrl = 'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code'
const maxAge = 30 * 24 * 60 * 60 // 30 days

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
        return user || null
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      const u = await userAuthService.getUserCredentials(user?.id || token?.sub)
      token.groups = u?.accessGroups?.map(g => g.groupId) || []
      return token
    }
    // async session({ session, token, user }) {
    //   // Send properties to the client, like an access_token and user id from a provider.
    //   session.accessToken = token.accessToken
    //   session.user.id = token.id

    //   return session
    // }
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
