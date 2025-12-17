import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors, UploadedFile, UsePipes, ValidationPipe } from '@nestjs/common'
import { NavService } from './nav.service'
import { CreateNavDto } from './dto/create-nav.dto'
import { UpdateNavDto } from './dto/update-nav.dto'
import cheerio from 'cheerio'
import { warn } from 'console'
import { FileInterceptor } from '@nestjs/platform-express'
import { promises as fsPromise } from 'fs'
import { Pagination, PaginationReq, PaginationRes, ResData } from '@/types/response'
// import { ZodValidatePipe } from '@/pipe/validation.pipe'
// import { navDataSchema } from 'nav-types'

@Controller('nav')
export class NavController {
  constructor(private readonly navService: NavService) { }
  @Get()
  async findAll(@Query() param: UpdateNavDto & PaginationReq) {
    return await this.navService.findAll(param, {
      pageSize: param.pageSize,
      page: param.page
    })
  }

  /**
   * 取出一级分类下面的所有网站，并且处理返回
   */
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.navService.findOneNavById(Number(id))
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() createNavDto: CreateNavDto):ResData {
    try {
      await this.navService.create(createNavDto)
      return {
        code: 1,
        msg: 'ok',
        data: '创建成功'
      }
    } catch (e) {
      warn(e)
      return {
        code: 0,
        msg: 'ok',
        err: e
      }
    }
  }

  @Post('/uploadFile')
  @UseInterceptors(FileInterceptor('file'))
  async createFile(@UploadedFile() uploadFile: Express.Multer.File) {
    let res
    // URL.createObjectURL(new Blob([]))
    try {
      const fileContent = await fsPromise.readFile(uploadFile.path, 'utf-8')
      // fsPromise.writeFile('./护犊子.json', JSON.stringify(groupMap))
      res = await this.navService.createMany(fileContent)
    } catch (e) {
      res = null
      console.warn(e)
    }
    if (res === null) {
      return {
        code: 0,
        msg: 'err',
        data: null
      }
    }
    return {
      code: 1,
      msg: 'ok',
      data: res
    }
  }

  @Get('/homepage')
  async findHomePage(@Query('pageSize') pageSize: number, @Query('page') page: number, @Query() param: UpdateNavDto) {
    return await this.navService.findAll(param, {
      pageSize,
      page
    })
  }

  @Post('/reptile')
  async findReptile(@Param('url') url: string) {
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

  // 获取一个随机的网址
  @Get('/random')
  async findRandom() {
    const result = await this.navService.getRandomNav()
    return result
  }

  @Post('/find')
  async findNav(@Param() param: UpdateNavDto) {
    try {
      const resData: any = []
      // 取所有子分类
      const categoryList = []

      const navList = []
      categoryList.forEach(category => {
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
    return this.navService.findAll(param, {
      page: 1,
      pageSize: undefined
    })
  }

  @Post('/ranking')
  async findRanking(@Param('id') id: string) {
    await this.navService.findRank()
    return {
      view: '',
      star: '',
      news: ''
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateNavDto: UpdateNavDto) {
    return this.navService.update(updateNavDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.navService.remove(+id)
  }
}
