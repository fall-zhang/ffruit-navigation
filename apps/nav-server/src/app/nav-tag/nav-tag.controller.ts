import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { NavTagService } from './nav-tag.service'
import { CreateNavTagDto } from './dto/create-nav-tag.dto'
import { UpdateNavTagDto } from './dto/update-nav-tag.dto'

@Controller('nav-tag')
export class NavTagController {
  constructor(private readonly navTagService: NavTagService) {}

  @Post()
  create(@Body() createNavTagDto: CreateNavTagDto) {
    return this.navTagService.create(createNavTagDto)
  }

  @Get()
  findAll(@Body() updateNavDto: UpdateNavTagDto, @Body('page') page:number, @Body('pageSize') pageSize:number) {
    return this.navTagService.findAll(updateNavDto, { page, pageSize })
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.navTagService.findOne(Number(id))
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNavTagDto: UpdateNavTagDto) {
    return this.navTagService.update(+id, updateNavTagDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.navTagService.remove()
  }
}
