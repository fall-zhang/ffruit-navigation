import { Injectable } from '@nestjs/common'
import { CreateTagDto } from './dto/create-tag.dto'
import { PrismaService } from '@/prisma.service'

@Injectable()
export class TagService {
  constructor (private prisma: PrismaService) {

  }

  async addMultiTag (tags:CreateTagDto[]) {
    if (!Array.isArray(tags)) return

    try {
      this.prisma.navTag.createMany({
        data: tags
      })
    } catch (err) {
      return err
    }
  }

  async create (createTagDto:CreateTagDto) {
    this.prisma.navTag.create({
      data: createTagDto
    })
  }

  async findOne () {

  }
}
