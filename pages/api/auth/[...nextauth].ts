import NextAuth, { Session } from 'next-auth'
import Providers from 'next-auth/providers'
import Adapters from 'next-auth/adapters'
import { PrismaClient, User } from '@prisma/client'
import { NextAuthRequest, NextAuthResponse } from 'next-auth/internals'
let prisma

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient()
  }
  prisma = global.prisma
}
const options = {
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Providers.Discord({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
    }),
  ],
  adapter: Adapters.Prisma.Adapter({ prisma }),
  callbacks: {
    session: async (session: Session, user: User) => {
      const sessionUser = session.user as User
      sessionUser.id = user.id
      sessionUser.image = user.image
      session.user = sessionUser

      return Promise.resolve(session)
    },
  },
}
export default (req: NextAuthRequest, res: NextAuthResponse) =>
  NextAuth(req, res, options)
