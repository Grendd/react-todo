import mongoose from 'mongoose'

const Task = new mongoose.Schema({
    id: {type: Number, required: true},
    taskName: {type: String, required: true},
    completed: {type: Boolean, required: true}
})

export default mongoose.model('Task', Task)