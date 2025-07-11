import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common'
import { NavService } from './nav.service'
import { CreateNavDto } from './dto/create-nav.dto'
import { UpdateNavDto } from './dto/update-nav.dto'
import cheerio from 'cheerio'
import { warn } from 'console'

@Controller('nav')
export class NavController {
  constructor (private readonly navService: NavService) {}

  @Post()
  async create (@Body() createNavDto: CreateNavDto) {
    try {
      await this.navService.create(createNavDto)
    } catch (e) {
      warn(e)
    }
    return {
      code: 1,
      msg: 'ok',
      data: '创建成功'
    }
  }

  @Get()
  async findAll (@Query() findQuery:UpdateNavDto, @Query('keyword') keyword:string) {
    this.navService.findAll(findQuery, keyword)
  }

  /**
   * 取出一级分类下面的所有网站，并且处理返回
   */
  @Get(':id')
  findOne (@Param('id') id: string) {
    return this.navService.findOne(+id)
  }

  @Get('/reptile')
  async findReptile (@Param('url') url: string) {
    const res = await new Promise((resolve) => {
      fetch(url).then(res => res.json()).then((res) => {
        if (res.error) {
          console.error('爬虫爬取失败')
          return
        }
        const $ = cheerio.load(res)
        const name = $('title').text()
        const desc = $('meta[name="description"]').attr('content')
        resolve({
          name,
          desc,
          href: url
        })
      }).catch(err => {
        console.warn(err)
      })
    })

    return {
      code: 1,
      msg: 'ok',
      data: res
    }
  }

  @Get('/random')
  async findRandom (@Param('id') id: string) {
    const result = await this.navService.getRandomNav()
    return result
  }

  @Get('/find')
  async findFind (@Param('id') id: string, @Param('categoryId') categoryId:string) {
    try {
      const resData: any = []
      // 取所有子分类
      // const categorys = await Category.find({ categoryId })
      const categorys = []
      const categoryIds = categorys.reduce((t, v) => [...t, v._id], [])

      const navList = []
      // const navs = await Nav.find({
      //   categoryId: { $in: categoryIds },
      //   $or: [
      //     { status: { $exists: false } },
      //     { status: 0 }
      //   ]
      // })

      categorys.forEach(category => {
        const nowNaves = navList.filter(nav => nav.categoryId === category._id)
        resData.push({
          _id: category._id,
          name: category.name,
          list: nowNaves
        })
      })
    } catch (error) {
      console.warn(error)
    }
    return this.navService.findOne(+id)
  }

  @Get('/ranking')
  async findRanking (@Param('id') id: string) {
    await this.navService.findRank()
    return {
      view: '',
      star: '',
      news: ''
    }
  }

  @Patch(':id')
  async update (@Param('id') id: string, @Body() updateNavDto: UpdateNavDto) {
    return this.navService.update(updateNavDto)
  }

  @Delete(':id')
  remove (@Param('id') id: string) {
    return this.navService.remove(+id)
  }
}
