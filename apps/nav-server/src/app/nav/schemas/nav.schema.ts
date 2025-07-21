// import { Schema } from 'mongoose'

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'
import { TagDocument } from '@/app/tag/schemas/tag.schema'
import { HydratedDocument } from 'mongoose'

@Schema()
export class NavigateLink {
  @Prop()
  categoryId: string

  @Prop()
  name: string

  // 网站url
  @Prop()
  href: string

  @Prop()
  desc: string

  @Prop()
  logo: string

  @Prop()
  authorName: string

  @Prop()
  authorUrl: string

  @Prop(Date)
  auditTime: Date

  @Prop(Date)
  createTime: Date

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Owner' })
  tag:TagDocument

  // 页面浏览次数
  @Prop({
    type: Number,
    default: 0
  })
  view: number

  @Prop({
    type: Number,
    default: 0
  })
  star: number

  // 审核状态 1 审核中 2 拒绝 3 通过
  @Prop({
    type: Number,
    default: 0
  })
  status: number

  // 访问状态 1 正常访问 2 需要代理 3 网站已停用
  @Prop({
    type: Number,
    default: 0
  })
  accessState: number
}

export type NavigateDocument = HydratedDocument<NavigateLink>

export const NavSchema = SchemaFactory.createForClass(NavigateLink)
// return mongoose.model('Nav', NavSchema)
