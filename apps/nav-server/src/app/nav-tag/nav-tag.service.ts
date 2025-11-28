import { Injectable } from '@nestjs/common'
import { CreateNavTagDto } from './dto/create-nav-tag.dto'
import { UpdateNavTagDto } from './dto/update-nav-tag.dto'
import { Pagination, PaginationReq } from '@/types/response'
import { PrismaService } from '@/prisma.service'

@Injectable()
export class NavTagService {
  constructor (private prisma: PrismaService) { }

  create(navTagInfo: CreateNavTagDto) {
    this.prisma.navTag.create({
      data: {
        createTime: new Date(),
        ...navTagInfo
      }
    })
    return 'This action adds a new navTag'
  }

  async findAll(param:Partial<UpdateNavTagDto>, { page, pageSize }:PaginationReq) {
    let result = []
    let totalLength:number
    try {
      const pageInfo = {
        take: pageSize || 999,
        skip: (page - 1) * pageSize || 0
      }

      const data = await this.prisma.navTag.findMany({
        ...pageInfo,
        where: {
          ...param
        }
      })
      totalLength = await this.prisma.navTag.count()
      result = data
    } catch (err) {
      console.log('err', err)
    }
    return {
      code: 200,
      currentPage: page,
      pageSize,
      total: totalLength,
      data: result
    }
  }

  async findOne(id: number) {
    return await this.prisma.navTag.findUnique({
      where: {
        id
      }
    })
  }

  update(id: number, updateNavTagDto: UpdateNavTagDto) {
    return 'Tag 不应该更新'
  }

  remove() {
    return 'Tag 不应该删除'
  }
}
