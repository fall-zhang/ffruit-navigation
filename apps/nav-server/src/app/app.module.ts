import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ResHandlerMiddleware } from '@/middleware/res-handler/res-handler.middleware'
import { ConfigModule } from '@nestjs/config'
import { FeedbackModule } from './feedback/feedback.module'
import { BacklogModule } from './backlog/backlog.module'
import { NavModule } from './nav/nav.module'
// import { MongooseModule } from '@nestjs/mongoose'
@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [ConfigModule.forRoot({
    envFilePath: '.env.local',
    isGlobal: true
  }), FeedbackModule, BacklogModule, NavModule
  // MongooseModule.forRoot('mongodb://localhost:1')
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
