import { Schema } from 'mongoose'

export const UserSchema = new Schema({
  username: String,
  password: String,
  isAdmin: Boolean,
}, { collection: 'user' })

// return mongoose.model('User', UserSchema)
