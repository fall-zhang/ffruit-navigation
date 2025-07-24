import { NestFactory } from '@nestjs/core'
import { AppModule } from './app/app.module'
import { VersioningType } from '@nestjs/common'
import * as session from 'express-session'

async function bootstrap () {
  const app = await NestFactory.create(AppModule)
  // app.useLogger()
  app.enableVersioning({
    type: VersioningType.URI
  })
  // app.use('/', trpcExpress.createExpressMiddleware({
  //   router: appRouter,
  //   createContext
  // }))
  app.use(session({ secret: 'Auth_Session', name: 'auth_code', cookie: { maxAge: 1_000_000 } }))
  await app.listen(4773)
}
bootstrap()
