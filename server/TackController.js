import Task from "./TaskProto.js";
import {json} from "express";

class TackController{
    async create(req, res){
        try {
            const {id, taskName, completed} = req.body
            const task = await Task.create({id, taskName, completed})
            res.json(task)
        } catch (e) {
            res.status(500).json(e)
        }
    }
    async getAll(req, res){
        try {
            const tasks = await Task.find()
            return (res.json(tasks))
        } catch (e) {
            res.status(500).json(e)
        }
    }
    async getOne(req, res){
        try {
            const {id} = (req.params)
            if (!id){
                res.status(400).json({ message: "Invalid ID"})
            }
            const task = await Task.findById(id)
            return res.json(task)
        } catch (e) {
            res.status(500).json(e)
        }
    }
    async update(req, res){
        try {
            const task = req.body
            if (!task.id){
                res.status(400).json({ message: "Invalid ID"})
            }
            const updatedPost = await Task.findOneAndUpdate({id: task.id}, task)
            return res.json(updatedPost)
        } catch (e) {
            res.status(500).json(e)
        }
    }
    async delete(req, res){
        try {
            const task = req.body
            if (!task.id){
                res.status(400).json({ message: "Invalid ID"})
            }
            const deletedTask = await Task.findOneAndDelete({id: task.id})
            return res.json(deletedTask)
        } catch (e) {
            res.status(500).json(e)
        }
    }
}

export default new TackController()