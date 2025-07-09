import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ResHandlerMiddleware } from '@/middleware/res-handler/res-handler.middleware'
import { ConfigModule } from '@nestjs/config'
import { BridgeModule } from './bridge/bridge.module'
import { FeedbackModule } from './feedback/feedback.module'
import { ReleaseModule } from './release/release.module'
import { BacklogModule } from './backlog/backlog.module'
import { AuthModule } from './auth/auth.module'
import { MongooseModule } from '@nestjs/mongoose'
@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [ConfigModule.forRoot({
    envFilePath: '.env.local',
    isGlobal: true
  }), BridgeModule, FeedbackModule, ReleaseModule, BacklogModule, AuthModule,
  MongooseModule.forRoot('mongodb://localhost:1')
  ]
})

export class AppModule implements NestModule {
  configure (consumer: MiddlewareConsumer) {
    consumer.apply(ResHandlerMiddleware).forRoutes({
      path: '',
      method: RequestMethod.ALL
    })
  }
}
