import Router from "express";
import bcrypt from 'bcryptjs';
import {check, validationResult} from "express-validator";
import jwt from 'jsonwebtoken'
import config from 'config'
import User from "../models/User.js";
import TackController from "../TackController.js";

const router = new Router()

router.post('/tasks', TackController.create)
router.get('/tasks', TackController.getAll)
router.get('/tasks/:id', TackController.getOne)
router.put('/tasks', TackController.update)
router.delete('/tasks', TackController.delete)

router.post('/register', [
        check('email', 'wrong email').isEmail,
        check('password', 'wrong password').isLength({min: 6})
    ]
    ,async (req, res) => {
        try {
            console.log("server", req)
            const errors = validationResult(req);

            if (!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Invalid login or password'
                })
            }
            const {email, password} = req.body;

            const candidate = await User.findOne({ email })
            if (candidate) {
                return res.status(400).json({message: 'User already exists'})
            }

            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new User({email, password: hashedPassword})
            await user.save()

            return res.status(201).json({message: 'User created!'})
        } catch (e) {
            res.status(500).json({message: 'Registration failed'});
        }
})

router.post('/login',[
        check('email', 'wrong email').normalizeEmail().isEmail(),
        check('password', 'wrong password').exists()
    ], async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Invalid login or password'
                })
            }
            const {email, password} = req.body;

            const user = await User.findOne({ email })
            if (!user) {
                return res.status(400).json({message: 'User not found'})
            }

            const isMatch = bcrypt.compare(password, candidate.password)
            if (!isMatch){
                return res.status(400).json({message: 'Wrong password'})
            }

            const token = jwt.sign(
                {userId: user.id},
                config.get('JWtoken'),
            )
            return res.json({token, userId: user.id, message: 'User logined successfully'})
        } catch (e) {
            res.status(500).json({message: 'Login failed'});
        }
})



export default router;