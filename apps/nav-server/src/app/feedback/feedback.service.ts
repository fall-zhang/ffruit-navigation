import { Injectable } from '@nestjs/common'
import { CreateFeedbackDto } from './dto/create-feedback.dto'
import { UpdateFeedbackDto } from './dto/update-feedback.dto'
import { PrismaService } from '@/prisma.service'
import { UserFeedback } from '@prisma/client'
import { randomUUID } from 'crypto'

@Injectable()
export class FeedbackService {
  constructor (private prisma: PrismaService) {}
  async create (createFeedbackDto: CreateFeedbackDto) {
    console.log('🚀 ~ FeedbackService ~ create ~ createFeedbackDto:', createFeedbackDto)
    const id = randomUUID()
    await this.prisma.userFeedback.create({
      data: {
        // id:id,
        ...createFeedbackDto
      }
    })
    return {
      state: 'success',
      msg: 'This action adds a new feedback'
    }
  }

  findAll () {
    return 'This action returns all feedback'
  }

  findOne (id: number) {
    return `This action returns a #${id} feedback`
  }

  update (id: number, updateFeedbackDto: UpdateFeedbackDto) {
    console.log('🚀 ~ FeedbackService ~ update ~ updateFeedbackDto:', updateFeedbackDto)

    return `This action updates a #${id} feedback`
  }

  remove (id: number) {
    return `This action removes a #${id} feedback`
  }
}
