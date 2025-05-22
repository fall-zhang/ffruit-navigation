import { HydratedDocument } from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

export type CategoryDocument = HydratedDocument<Category>;

@Schema()
export class Category {
  @Prop()
    name: string

  @Prop()
    categoryId: string

  @Prop()
    createAt: number

  @Prop({
    type:String,
    default:''
  })
    icon: string
  @Prop([{
    name: String,
    categoryId: String,
    createAt: Number,
    showInMenu: Boolean,
  }])
    children: object
  @Prop({
    type: Boolean,
    default: true
  })
    showInMenu: boolean
}
export const CategorySchema = SchemaFactory.createForClass(Category)

//  return mongoose.model('Category', CategorySchema)