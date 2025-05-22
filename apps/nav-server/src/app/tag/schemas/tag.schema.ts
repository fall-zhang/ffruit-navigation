import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type TagDocument = HydratedDocument<Tag>;
@Schema()
export class Tag {
  @Prop()
    name: string
  @Prop()
    parentName: string
  @Prop()
    describe: string
}

export const TagSchema = SchemaFactory.createForClass(Tag)

// return mongoose.model('Tag', TagSchema)