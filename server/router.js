import Router from "express";
import TackController from "./TackController.js";

const router = new Router()

router.post('/tasks', TackController.create)
router.get('/tasks', TackController.getAll)
router.get('/tasks/:id', TackController.getOne)
router.put('/tasks', TackController.update)
router.delete('/tasks', TackController.delete)

export default router;