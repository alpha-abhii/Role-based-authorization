import { User } from "../models/userModel.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


const register = async(req,res) => {
    try {
        const { username, password, role} = req.body;
        const hashedPassword = await bcrypt.hash(password,10);
    
        const newUser = new User({
            username,
            password: hashedPassword,
            role
        })
    
        await newUser.save();
    
        res.status(201).json({
            msg: `User registered with username ${username}`
        })
    } catch (error) {
        res.status(500).json({
            msg: "something went wrong while registering the user"
        })
    }
}

const login = async(req,res) => {
    try {
        const {username,password} = req.body;
        const user = await User.findOne({username});

        if(!user) {
            return res.status(404).json({
                msg: `User with username ${username} does not exists`
            })
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.status(400).json({
                msg: "Invalid credentials"
            })
        }

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        )

        return res.status(200).json({
            token
        })
    } catch (error) {
        res.status(500).json({
            msg: "something went wrong while logging the user"
        })
    }
}

export {
    register,
    login
}