import { Prisma, PrismaClient } from '@prisma/client'
import { publicProcedure, router } from './trpc'
import { z } from 'zod'
const appRouter = router({
  userList: publicProcedure.query(async () => {
    const prisma = new PrismaClient()
    const users = await prisma.userFeedback.findMany()
    return users
  }),
  userById: publicProcedure.input(z.string()).query(async (opts) => {
    const { input } = opts
    // await db.user.findById(input)
    const user = {
      name: '9991313'
    }
    return user
  }),
  userCreate: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async (opts) => {
      const { input } = opts
      // Create a new user in the database
      // const user = await db.user.create(input)
      const user = {
        name: '9991313'
      }
      return user
    })
})

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter
