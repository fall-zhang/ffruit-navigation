import { Module } from '@nestjs/common'
import { NavService } from './nav.service'
import { NavController } from './nav.controller'
import { PrismaService } from '@/prisma.service'
import { MulterModule } from '@nestjs/platform-express/multer'
import { join } from 'node:path'
import { diskStorage } from 'multer'

@Module({
  controllers: [NavController],
  providers: [NavService, PrismaService],
  imports: [
    MulterModule.register({
      dest: join(__dirname, './uploadFile'),
      storage: diskStorage({
        destination: join(__dirname, '../uploadFile'),
        filename (_, file, callback) {
          const list = file.originalname.split('.')
          const suffix = list.length > 1 ? list.at(-1) : ''
          let fullName:string
          if (suffix) {
            list.pop()
            list.push(new Date().getTime() + '')
            list.push(suffix)
            fullName = list.join('.')
          } else {
            fullName = file.originalname + new Date().getTime() + '.txt'
          }
          const fileName = fullName
          return callback(null, fileName)
        }
      })
    })
  ],
  exports: []
})
export class NavModule {}
