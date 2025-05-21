import { Schema } from 'mongoose'

export const CategorySchema = new Schema({
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

//  return mongoose.model('Category', CategorySchema)