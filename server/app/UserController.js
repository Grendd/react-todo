import User from "./models/User.js";
import {validationResult} from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "config";

class UserController{
    async login(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Invalid login or password'
                })
            }
            const {email, password} = req.body;

            const user = await User.findOne({email})
            if (!user) {
                return res.status(400).json({message: 'User not found'})
            }

            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                return res.status(400).json({message: 'Wrong password'})
            }

            const token = jwt.sign(
                {userId: user.id},
                config.get('JWtoken'),
                {expiresIn: '1h'}
            )
            return res.json({token, userId: user.id, message: 'User logined successfully'})
        } catch (e) {
            res.status(500).json({message: 'Login failed'});
        }
    }
    async register(req, res) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Invalid login or password'
                })
            }
            const {email, password} = req.body;

            const candidate = await User.findOne({email})
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
    }
}

export default new UserController()