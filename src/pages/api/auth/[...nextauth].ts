// pages/api/auth/[...nextauth].ts

import NextAuth, { NextAuthOptions } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

import { dbUsers } from '@/database'

declare module 'next-auth' {
  interface Session {
    accessToken?: string
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    // Puedes agregar más proveedores aquí (por ejemplo, Facebook, GitHub, etc.)
    Credentials({
      name: 'Custom Login',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'email@mail.com' },
        password: { label: 'Password', type: 'password', placeholder: '********' }
      },
      async authorize(credentials) {
        const user = await dbUsers.checkUserEmailPassword(credentials!.email, credentials!.password)
        if (user) {
          return {
            ...user,
            id: user._id
          }
        }
        return null
      }
    })
  ],

  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },

  pages: {
    signIn: '/auth/login',
    newUser: '/auth/register',
  },

  callbacks: {
    async jwt({ account, user, token }) {
      if (account) {
        token.accessToken = account.access_token
        token.user = user
      }
      return token
    },
    async session({ token, session }) {
      session.accessToken = token.accessToken as any
      session.user = token.user as any
      return session
    },

  }
}

export default NextAuth(authOptions)
