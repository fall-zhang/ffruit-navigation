import { Injectable } from '@nestjs/common'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import mongoose, { Model } from 'mongoose'
import { children } from 'cheerio/dist/commonjs/api/traversing'
import { InjectModel } from '@nestjs/mongoose'
import { Category } from './schemas/category.schema'

@Injectable()
export class CategoryService {
  constructor (@InjectModel(Category.name) private categoryModel:Model<Category>) {

  }

  create (createCategoryDto: CreateCategoryDto) {
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
        showInMenu: Boolean
      }],
      showInMenu: {
        type: Boolean,
        default: true
      }
    }, { collection: 'category' })
    return 'This action adds a new category'
  }

  async findAll () {
    try {
      const params: any = {}
      const data = await this.categoryModel.find(params).limit(100000)

      const newData = this.formatCategoryList(data)
      return newData
    } catch (error) {
      return error
    }
  }

  findOne (id: number) {
    return `This action returns a #${id} category`
  }

  async update (id: number, updateCategoryDto: UpdateCategoryDto) {
    await this.categoryModel.updateOne({ _id: id }, updateCategoryDto)
    return `This action updates a #${id} category`
  }

  async remove (id: number) {
    try {
      const data = await Promise.all([
        this.categoryModel.deleteOne({ _id: id }),
        this.categoryModel.deleteOne({ categoryId: id })
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
