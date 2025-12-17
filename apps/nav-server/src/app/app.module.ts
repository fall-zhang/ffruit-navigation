import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ResHandlerMiddleware } from '@/middleware/res-handler/res-handler.middleware'
import { ConfigModule } from '@nestjs/config'
import { FeedbackModule } from './feedback/feedback.module'
import { BacklogModule } from './backlog/backlog.module'
import { NavModule } from './nav/nav.module'
import { HomepageInfoModule } from './homepage-info/homepage-info.module'
import { UsersModule } from './users/users.module'
import { NavTagModule } from './nav-tag/nav-tag.module'
@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [ConfigModule.forRoot({
    envFilePath: '.env.local',
    isGlobal: true
  }), FeedbackModule, BacklogModule, NavModule, HomepageInfoModule, UsersModule, NavTagModule
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
