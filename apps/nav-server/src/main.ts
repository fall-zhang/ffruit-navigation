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
  app.use(
    session({
      secret: 'Auth_Session',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 48 * 60 * 60 * 1000
      }
    })
  )
  // app.use('/', trpcExpress.createExpressMiddleware({
  //   router: appRouter,
  //   createContext
  // }))
  // app.use()
  await app.listen(4773)
}
bootstrap()
