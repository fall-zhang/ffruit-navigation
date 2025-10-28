import { Injectable } from '@nestjs/common'
import { CreateNavDto } from './dto/create-nav.dto'
import { UpdateNavDto } from './dto/update-nav.dto'
import { PrismaService } from '@/prisma.service'
import { excludeUselessMark, firefoxBookmarkParse, FirefoxMarkItem, getMarkGroup } from '@/utils/firefox-bookmark-parse'
import { NavCategoryCreateManyInput, NavLinkCreateManyInput } from '@/generated/prisma/models'
import { ResData } from '@/types/response'
import { NavLink } from '@/generated/prisma/client'

type PaginationQuery = {
  pageSize:number
  page:number
}

@Injectable()
export class NavService {
  constructor (private prisma: PrismaService) {

  }

  async create (createNavDto: CreateNavDto):ResData<NavLink> {
    // 查询对应 tag 如果不存在就添加
    const savedNav = await this.prisma.navLink.create({
      data: {
        ...createNavDto,
        accessState: 'NORMAL',
        status: 'CHECK',
        auditTime: new Date().toISOString(),
        createTime: new Date().toISOString(),
        tag: undefined,
        categoryId: createNavDto.categoryId || '0'
      }
    })
    return {
      code: 1,
      msg: '新增成功',
      data: savedNav
    }
  }

  async createMany (jsonFile:string) {
    const fireFoxMark:FirefoxMarkItem[] = JSON.parse(jsonFile).children

    const navList = firefoxBookmarkParse(fireFoxMark)
    const navCount = await this.prisma.navLink.count()
    if (navCount < 10) {
      await this.prisma.navLink.createMany({
        data: navList.map(item => {
          return {
            ...item,
            parent: undefined
          }
        })
      })
    }
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
          } as NavLinkCreateManyInput
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

  async findAll (param:Partial<UpdateNavDto>, { page, pageSize }:PaginationQuery) {
    // table.find(findObj).skip(skipNumber).limit(pageSize).sort({ _id: -1 })
    let result
    let totalLength:number
    try {
      const pageInfo = {
        take: pageSize || 20,
        skip: page * pageSize || 0
      }

      const data = await this.prisma.navLink.findMany({
        ...pageInfo,
        where: {
          ...param,
          tag: undefined
        }
      })
      totalLength = await this.prisma.navLink.count()
      result = data
    } catch (err) {
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

  async findOneNavById (id: number):ResData<NavLink> {
    const navInfo = await this.prisma.navLink.findFirst({
      where: {
        id
      }
    })
    return {
      code: 1,
      data: navInfo,
      msg: '请求成功'
    }
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
    const navCount = await this.prisma.navLink.count()
    Math.random()

    // const allData = (await this.navLinkModel.find())
    // this.navLinkModel.
    // const dataLength = allData.length
    // const index = Math.floor(Math.random() * dataLength)
    // return allData.at(index)
    // allData.
  }

  async findRank () {
    try {
      const [view, star, news] = await Promise.allSettled([
        this.prisma.navLink.findMany({
          orderBy: [{
            star: 'desc'
          }]
        }),
        this.prisma.navLink.findMany({
          orderBy: [{
            view: 'desc'
          }]
        }),
        this.prisma.navLink.findMany({
          orderBy: [{
            createTime: 'desc'
          }]
        })
      ])

      return {
        view,
        star,
        news
      }
    } catch(err) {
      console.warn(err)
    }
  }
}
