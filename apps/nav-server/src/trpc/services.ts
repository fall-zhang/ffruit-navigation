import { initTRPC } from '@trpc/server'
import { z } from 'zod'
import * as trpcExpress from '@trpc/server/adapters/express'
import { PrismaClient } from '@prisma/client'
export const t = initTRPC.create()
export const appRouter = t.router({
  getUser: t.procedure.input(z.string()).query((opts) => {
    // opts.input // string
    return { id: opts.input, name: 'Bilbo' }
  }),
  createUser: t.procedure
    .input(z.object({ name: z.string().min(5) }))
    .mutation(async (opts) => {
      // use your ORM of choice
      const prisma = new PrismaClient()
      return prisma.userTrack.create({
        data: {
          id: 879797,
          programName: 'sss'
        }
      })
    })
})
// export type definition of API
export type AppRouter = typeof appRouter


// created for each request
export const createContext = ({
  req,
  res
}: trpcExpress.CreateExpressContextOptions) => ({}) // no context


export type Context = Awaited<ReturnType<typeof createContext>>
