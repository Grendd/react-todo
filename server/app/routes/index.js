import Router from "express";
import {check} from "express-validator";

import TackController from "../TackController.js";
import UserController from "../UserController.js";

const router = new Router()

router.post('/tasks/create', TackController.create)
router.post('/tasks', TackController.getAll)
router.get('/tasks/:id', TackController.getOne)
router.put('/tasks', TackController.update)
router.delete('/tasks', TackController.delete)

router.post('/register', [
        check('email', 'wrong email').isEmail(),
        check('password', 'wrong password').isLength({min: 6})
    ], UserController.register)

router.post('/login',[
        check('email', 'wrong email').normalizeEmail().isEmail(),
        check('password', 'wrong password').exists()
    ], UserController.login)



export default router;