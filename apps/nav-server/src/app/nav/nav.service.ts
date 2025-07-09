import { Injectable } from '@nestjs/common'
import { CreateNavDto } from './dto/create-nav.dto'
import { UpdateNavDto } from './dto/update-nav.dto'
import { InjectModel } from '@nestjs/mongoose'
import { NavigateLink } from './schemas/nav.schema'
import { Model } from 'mongoose'

@Injectable()
export class NavService {
  constructor (@InjectModel(NavigateLink.name) private navLinkModel:Model<NavigateLink>) {

  }

  async create (createNavDto: CreateNavDto) {
    const createTime = new Date()
    const savedNav = new this.navLinkModel(createNavDto)
    return savedNav.save()
  }

  async findAll (updateNavDto:UpdateNavDto, keyword:string) {
    // table.find(findObj).skip(skipNumber).limit(pageSize).sort({ _id: -1 })
    const id = updateNavDto.id
    if (id) {
      await this.navLinkModel.findOne({ _id: id })
    } else if (keyword) {
      const reg = new RegExp(keyword, 'i')
      await this.navLinkModel.find({
        name: { $regex: reg }
      }).limit(10)
    }
    return 'This action returns all nav'
  }

  findOne (id: number) {
    return `This action returns a #${id} nav`
  }

  async update (updateNavDto: UpdateNavDto) {
    const id = updateNavDto.id
    const updateTime = new Date()
    await this.navLinkModel.updateOne({ _id: id }, updateNavDto)
    return `This action updates a #${id} nav`
  }

  async remove (id: number) {
    await this.navLinkModel.deleteOne({ _id: id })
    return `This action removes a #${id} nav`
  }

  async getRandomNav () {
    const allData = (await this.navLinkModel.find())
    // this.navLinkModel.
    const dataLength = allData.length
    const index = Math.floor(Math.random() * dataLength)
    return allData.at(index)
    // allData.
  }

  async findRank () {
    const [view, star, news] = await Promise.all([
      this.navLinkModel.find().sort({ view: -1 }).limit(1),
      this.navLinkModel.find().sort({ star: -1 }).limit(1),
      this.navLinkModel.find().sort({ createTime: -1 }).limit(1)
      // this.findMaxValueList('view'),
      // this.findMaxValueList('star'),
      // this.findMaxValueList('createTime')
    ])
    return {
      view,
      star,
      news
    }
  }
}
