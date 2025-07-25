import { Injectable } from '@nestjs/common'
import { CreateNavDto } from './dto/create-nav.dto'
import { UpdateNavDto } from './dto/update-nav.dto'
import { PrismaService } from '@/prisma.service'
import { excludeUselessMark, firefoxBookmarkParse, FirefoxMarkItem, getMarkGroup } from '@/utils/firefox-bookmark-parse'
import { NavCategoryCreateManyInput } from '@/generated/prisma/models'

type PaginationQuery = {
  pageSize:number
  page:number
}

@Injectable()
export class NavService {
  constructor (private prisma: PrismaService) {

  }

  async create (createNavDto: CreateNavDto) {
    // const savedNav = new this.navLinkModel(createNavDto)
    return true
  }

  async createMany (jsonFile:string) {
    const fireFoxMark:FirefoxMarkItem[] = JSON.parse(jsonFile).children

    const navList = firefoxBookmarkParse(fireFoxMark)
    const pureNavList = excludeUselessMark(navList)

    const categoryList:NavCategoryCreateManyInput[] = getMarkGroup(navList)
    const dbCategoryList = await this.prisma.navCategory.findMany()
    const dbNavList = await this.prisma.navLink.findMany()
    const result = {
      category: dbCategoryList,
      nav: dbNavList
    }
    if (dbNavList.length === 0) {
      result.nav = await this.prisma.navLink.createManyAndReturn({
        data: pureNavList.map(item => {
          const result = {
            ...item,
            parent: undefined
          } as CreateNavDto
          return result
        })
      })
    }
    if (dbCategoryList.length === 0) {
      result.category = await this.prisma.navCategory.createManyAndReturn({
        data: categoryList
      })
    }
    return result
  }

  async findAll ({ page, pageSize }:PaginationQuery) {
    // table.find(findObj).skip(skipNumber).limit(pageSize).sort({ _id: -1 })
    let result:any[]
    let totalLength:number
    try {
      const data = await this.prisma.navLink.findMany({ })
      totalLength = await this.prisma.navLink.count()
      if (!page || !pageSize) {
        const startIndex = (page - 1) * pageSize
        result = data.splice(startIndex, pageSize)
      } else {
        result = data
      }
    } catch (err) {
      totalLength = 0
      result = []
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

  findOne (id: number) {
    return `This action returns a #${id} nav`
  }

  async update (updateNavDto: UpdateNavDto) {
    const id = updateNavDto.id
    const updateTime = new Date()
    // await this.navLinkModel.updateOne({ _id: id }, updateNavDto)
    return `This action updates a #${id} nav`
  }

  async remove (id: number) {
    // await this.navLinkModel.deleteOne({ _id: id })
    return `This action removes a #${id} nav`
  }

  async getRandomNav () {
    // const allData = (await this.navLinkModel.find())
    // this.navLinkModel.
    // const dataLength = allData.length
    // const index = Math.floor(Math.random() * dataLength)
    // return allData.at(index)
    // allData.
  }

  async findRank () {
    // const [view, star, news] = await Promise.all([
    // this.navLinkModel.find().sort({ view: -1 }).limit(1),
    // this.navLinkModel.find().sort({ star: -1 }).limit(1),
    // this.navLinkModel.find().sort({ createTime: -1 }).limit(1)
    // this.findMaxValueList('view'),
    // this.findMaxValueList('star'),
    // this.findMaxValueList('createTime')
    // ])
    // return {
    //   view,
    //   star,
    //   news
    // }
    //
  }
}
