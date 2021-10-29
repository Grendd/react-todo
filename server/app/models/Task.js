import mongoose from 'mongoose'

// const {Types} = mongoose

const SubTask = mongoose.Schema({
    id: {type: String, required: true},
    taskName: {type: String, required: true},
    completed: {type: Boolean, required: true}
})
const Task = new mongoose.Schema({
    id: {type: String, required: true},
    taskName: {type: String, required: true},
    completed: {type: Boolean, required: true},
    subtasks: [SubTask] || [],
    // owner: {type: Types.ObjectId, ref: 'User'}
})

export default mongoose.model('Task', Task, 'tasks')