import { Injectable } from '@nestjs/common'
import { CreateTagDto } from './dto/create-tag.dto'
import { UpdateTagDto } from './dto/update-tag.dto'

@Injectable()
export class TagService {
  async addMultiTag(tags) {
    if (!Array.isArray(tags)) return

    try {
      const tagData = tags.map(item=> {
        return {
          name: item
        }
      })
      const res = await Tag.insertMany(tagData, { ordered: false })
      return res
    } catch (err) {
      return err
    }
  }
}
