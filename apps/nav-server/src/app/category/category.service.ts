import { Injectable } from '@nestjs/common'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { PrismaService } from '@/prisma.service'

@Injectable()
export class CategoryService {
  constructor (private prisma: PrismaService) {}


  create (createCategoryDto: CreateCategoryDto) {
    return 'This action adds a new category'
  }

  async findAll () {
    try {
      const params: any = {}
      const data = await this.prisma.navCategory.findMany()

      const newData = this.formatCategoryList(data)
      // return newData
    } catch (error) {
      return error
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
