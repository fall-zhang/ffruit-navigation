import { Injectable } from '@nestjs/common'
import { CreateNavDto } from './dto/create-nav.dto'
import { UpdateNavDto } from './dto/update-nav.dto'
import { InjectModel } from '@nestjs/mongoose'
import { NavigateLink } from './schemas/nav.schema'
import { Model } from 'mongoose'

@Injectable()
export class NavService {
  constructor(@InjectModel(NavigateLink.name) private navLinkModel:Model<NavigateLink>){

  }
  create(createNavDto: CreateNavDto) {
    return 'This action adds a new nav'
  }

  findAll() {
    // table.find(findObj).skip(skipNumber).limit(pageSize).sort({ _id: -1 })
    return `This action returns all nav`
  }

  findOne(id: number) {
    return `This action returns a #${id} nav`
  }

  async update(id: number, updateNavDto: UpdateNavDto) {
    const updateTime = new Date()
    await this.navLinkModel.updateOne({ _id: id }, updateNavDto)
    return `This action updates a #${id} nav`
  }

  async remove(id: number) {
    await this.navLinkModel.deleteOne({ _id: id })
    return `This action removes a #${id} nav`
  }

  async findRank(){
    const [view, star, news] = await Promise.all([
      this.navLinkModel.find().sort({view:-1}).limit(1),
      this.navLinkModel.find().sort({star:-1}).limit(1),
      this.navLinkModel.find().sort({createTime:-1}).limit(1)
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
