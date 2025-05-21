import { Schema } from 'mongoose'

export const TagSchema = new Schema({
  name: String,
  parentName: String,
}, { collection: 'tag' })

// return mongoose.model('Tag', TagSchema)