import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { CategoryService } from './category.service'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import mongoose from 'mongoose'
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    await super.add()

    const Schema = mongoose.Schema

    const CategorySchema = new Schema({
      name: String,
      categoryId: String,
      createAt: Number,
      icon: {
        type: String,
        default: ''
      },
      children: [{
        name: String,
        categoryId: String,
        createAt: Number,
        showInMenu: Boolean,
      }],
      showInMenu: {
        type: Boolean,
        default: true
      },
    }, { collection: 'category' })
    return this.categoryService.create(createCategoryDto)
  }

  @Get()
  findAll() {
    const { ctx } = this
    const { showInMenu = true } = ctx.query
    try {
      const params: any = {}
      if (showInMenu && showInMenu !== 'false') {
        params.showInMenu = { $in: [null, true] }
      }
      const data = await ctx.model.Category.find(params).limit(100000)

      const newData = this.categoryService.formatCategoryList(data)
      this.success(newData)
    } catch (error) {
      this.error(error.message)
    }
    return this.categoryService.findAll()

  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    await super.update()

    return this.categoryService.update(+id, updateCategoryDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const { ctx } = this
    try {
      const { id } = ctx.request.body
      const data = await Promise.all([
        ctx.model.Category.remove({ _id: id }),
        ctx.model.Category.remove({ categoryId: id })
      ])
      this.success(data)
    } catch (error) {
      this.error(error.message)
    }
    return this.categoryService.remove(+id)
  }
}
