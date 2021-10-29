import mongoose from 'mongoose'

const {Types} = mongoose;

const userSchema = new mongoose.Schema({
  email: {type:String, required: true, unique: true},
  password: {type:String, required: true, unique: true},
  // tasks: {type: Types.ObjectId, ref: 'Task'}
})

export default mongoose.model('User', userSchema, 'users');