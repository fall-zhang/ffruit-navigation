import { Injectable } from '@nestjs/common'
import { CreateTagDto } from './dto/create-tag.dto'
import { Tag, TagDocument, TagSchema } from './schemas/tag.schema'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

@Injectable()
export class TagService {
  constructor (@InjectModel(Tag.name) private TagModel:Model<Tag>) {}

  async addMultiTag (tags:CreateTagDto[]) {
    if (!Array.isArray(tags)) return

    try {
      const createdTag = new this.TagModel(tags)
      return createdTag.save()
    } catch (err) {
      return err
    }
  }

  async create (createTagDto:CreateTagDto) {
    const createdTag = new this.TagModel(createTagDto)
    return createdTag.save()
  }

  async findOne () {

  }
}
