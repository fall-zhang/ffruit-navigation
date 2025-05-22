import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common'
import { NavService } from './nav.service'
import { CreateNavDto } from './dto/create-nav.dto'
import { UpdateNavDto } from './dto/update-nav.dto'
import cheerio from 'cheerio'
import { warn } from 'console'
import mongoose from 'mongoose'

const tableName = 'Nav'

@Controller('nav')
export class NavController {
  constructor(private readonly navService: NavService) {}

  @Post()
  async create(@Body() createNavDto: CreateNavDto) {
    const createTime = new Date()
    try {
      await this.navService.create(createNavDto)
    } catch (e) {
      warn(e)
    }
    return {
      code: 1,
      msg: 'ok',
      data:'创建成功'
    }
  }

  @Get()
  findAll(@Query() findQuery:Pick<UpdateNavDto,'id'>) {
    const { id } = findQuery

    if (id) {
      await mongoose.findOne({ _id: id })
    } else if (keyword) {
      const reg = new RegExp(keyword, 'i')
      await super.getList({
        name: { $regex: reg }
      }, (table) => table.limit(10))
    }
  }
  /**
   * 取出一级分类下面的所有网站，并且处理返回
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.navService.findOne(+id)
  }
  @Get('/list')
  findList(@Param('id') id: string) {
    const { ctx } = this
    const { model } = ctx
    const { status = 0, categoryId, name } = ctx.query

    let findParam: any = {
      status
    }
    if (!status) {
      findParam = {
        $or: [
          { status: { $exists: false } },
          { status: 0 }
        ]
      }
    }
    if (categoryId) {
      findParam.categoryId = {
        $eq: categoryId
      }
    }
    if (name) {
      const reg = new RegExp(name, 'i')
      findParam.name = {
        $regex: reg
      }
    }

    await super.getList(findParam)
    return this.navService.findOne(+id)
  }
  @Get('/audit')
  findAudit(@Param('id') id: string) {
    const { ctx } = this
    this.ctx.request.body.auditTime = new Date()

    const { status, id } = this.ctx.request.body

    const navItem = await this.ctx.model.Nav.findOne({ _id: id })
    const { tags } = navItem

    if (status === NAV_STATUS.pass) {
      // 批量添加tag
      await this.ctx.service.tag.addMultiTag(tags)
    }
    await super.update()
    return this.navService.findOne(+id)
  }
  @Get('/reptile')
  findReptile(@Param('id') id: string) {
    const ctx = this.ctx
    const { url } = ctx.query
    const that = this
    const res = await new Promise((resolve) => {
      request(url, (error, requestData, body) => {
        if (!error && requestData.statusCode === 200) {
          const $ = cheerio.load(body)
          const name = $('title').text()
          const desc = $('meta[name="description"]').attr('content')

          resolve({
            name,
            desc,
            href: url
          })
        } else {
          that.error('爬虫爬取失败')
        }
      })
    })

    return {
      code: 1,
      msg: 'ok',
      data:res
    }
  }
  @Get('/random')
  findRandom(@Param('id') id: string) {
    await super.getRandomList()

    return this.navService.findOne(+id)
  }
  @Get('/find')
  findFind(@Param('id') id: string) {
    const { request, model } = this.ctx
    try {
      const { id, categoryId } = request.query
      const resData: any = []
      // 取所有子分类
      const categorys = await model.Category.find({ categoryId })
      const categoryIds = categorys.reduce((t, v) => [...t, v._id], [])

      const navs = await model.Nav.find({
        categoryId: { $in: categoryIds },
        $or: [
          { status: { $exists: false } },
          { status: 0 }
        ]
      })

      categorys.map(category => {
        const nowNavs = navs.filter(nav => nav.categoryId == category._id)
        resData.push({
          _id: category._id,
          name: category.name,
          list: nowNavs
        })
      })
      this.success(resData)
    } catch (error) {
      this.error(error.message)
    }
    return this.navService.findOne(+id)
  }
  @Get('/ranking')
  async findRanking(@Param('id') id: string) {

    await this.navService.findRank()
    return {
      view,
      star,
      news
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateNavDto: UpdateNavDto) {
    return this.navService.update(+id, updateNavDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {

    return this.navService.remove(+id)
  }
}
