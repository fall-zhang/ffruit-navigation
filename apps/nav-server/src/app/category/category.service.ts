import { Injectable } from '@nestjs/common'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { PrismaService } from '@/prisma.service'
import { NavCategory } from '@/generated/prisma/client'

type PaginationQuery = {
  pageSize?:number
  page?:number
}

@Injectable()
export class CategoryService {
  constructor (private prisma: PrismaService) {}


  create (createCategoryDto: CreateCategoryDto) {
    return 'This action adds a new category'
  }

  async findAll ({ page, pageSize }:PaginationQuery) {
    let res:NavCategory[]
    try {
      if (page && pageSize) {
        res = await this.prisma.navCategory.findMany({
          take: pageSize,
          skip: page * pageSize
        })
      } else {
        res = await this.prisma.navCategory.findMany()
      }
    } catch (error) {
      console.log('CategoryService ~ findAll ~ error:', error)
    }
    return {
      code: 200,
      data: res
    }
  }

  findOne (id: number) {
    return `This action returns a #${id} category`
  }

  async update (id: number, updateCategoryDto: UpdateCategoryDto) {
    await this.prisma.navCategory.update({
      data: updateCategoryDto,
      where: {
        id
      }
    })
    return `This action updates a #${id} category`
  }

  async remove (id: number) {
    try {
      const data = await Promise.all([
        this.prisma.navCategory.delete({
          where: { id }
        }),
        this.prisma.navCategory.delete({
          where: {
            id
          }
        })
      ])
      return data
    } catch (error) {
      return error
    }
  }

  formatCategoryList (data) {
    const stairCategory = data.filter(item => !item.categoryId)
    const secondCategory = data.filter(item => item.categoryId)

    const newData = stairCategory.map(item => {
      const result = {
        ...item,
        children: [...secondCategory.filter(cate => item._id === cate.categoryId)]
      }
      return result
    })

    return newData
  }
}
