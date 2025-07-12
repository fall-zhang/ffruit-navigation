import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common'
import { TagService } from './tag.service'
import { CreateTagDto } from './dto/create-tag.dto'
import { UpdateTagDto } from './dto/update-tag.dto'
import { TagSchema } from './schemas/tag.schema'

@Controller('tag')
export class TagController {
  constructor (private readonly tagService: TagService) {}

  @Post()
  create (@Body() createTagDto: CreateTagDto) {
    return this.tagService.create(createTagDto)
  }

  @Get()
  async findAll (@Query() query:{
    pageSize?:number
    pageNumber?:number
  }) {
    try {
      let { pageSize = 10, pageNumber = 1 } = query
      pageSize = Number(pageSize)
      pageNumber = Number(pageNumber)
      const skipNumber = pageSize * pageNumber - pageSize
      // const TagTable = model('Tag', TagSchema)
      // const data = table.find({}).skip(skipNumber).limit(pageSize).sort({ _id: -1 })

      // const total = table.find({}).then((res=>res.length))

      // const [data, total] = await Promise.all([TagTable.find({}).skip(skipNumber).limit(pageSize).sort({ _id: -1 }), (await TagTable.find({})).length])
      const pageNum = Math.ceil(2323 / pageSize)
      return {
        data: [],
        total: 2323,
        pageNumber: pageNum
      }
    } catch (e) {
      return {
        code: 0,
        msg: e,
        data: null
      }
    }
  }
}
