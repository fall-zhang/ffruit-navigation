import { createTRPCClient, httpBatchLink } from '@trpc/client'
import type { AppRouter } from '@P/nav-server/src/trpc/services'
//     👆 **type-only** import

// Pass AppRouter as generic here. 👇 This lets the `trpc` object know
// what procedures are available on the server and their input/output types.
export const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000',
    }),
  ],
})

// const user = await trpc.getUser.query('1')