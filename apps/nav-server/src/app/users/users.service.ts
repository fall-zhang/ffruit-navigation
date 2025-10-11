import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { PrismaService } from '@/prisma.service'
// import { User } from '@prisma/client'
// import { User } from '@/generated/prisma/client'
// import { UserFeedback } from '@/generated/prisma/models'
import { UserFeedback } from '@/generated/prisma/client'
type LoginRes = {
  msg:string
  state:boolean
}
@Injectable()
export class UsersService {
  constructor (private prisma: PrismaService) {

  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user'
  }

  findAll() {
    return 'This action returns all users'
  }

  async findOne(name: string):Promise<UserFeedback> {
    const user = await this.prisma.userFeedback.findFirst({
      where: {
        // name
      }
    })
    return user
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`
  }

  remove(id: number) {
    return `This action removes a #${id} user`
  }
}
