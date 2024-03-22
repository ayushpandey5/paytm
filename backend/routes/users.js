const { Router } = require("express")
const router = Router()
const {UserType, SignInType} = require("../utils/types")
const User = require('../models/users')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');

router.post("/signup", async (req,res) => {
    const {username, email, password} = req.body
    const parsed = UserType.safeParse({username, email, password})

    if(parsed.error){
        return res.status(400).json({error: "Invalid Data"})
    }
    
    try {
        const existingUser = await User.findOne({
            email: email
        })

        if(existingUser){
            return res.status(404).json({error: "User already exists"})
        }

        const hashedPassword = await bcrypt.hash(password, 10)
    
        const newUser = User({
            username: username,
            email:email,
            password: hashedPassword
        })
    
        await newUser.save()
        return res.status(202).json({success: "User created successfully"})
    } catch (error) {
        console.error(error)
        return res.status(500).json({error: "Server Error"})
    }
})


router.post('/signin', async (req, res) => {
    const {email, password} = req.body
    const parsed = SignInType.safeParse({email, password})

    if(parsed.error){
        return res.status(400).json({error: "Invalid data"})
    }

    try {
        const user = await User.findOne({
            email: email,
        })

        if(!user){
            return res.status(404).json({error: "User doesnot exist"})
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if(!isPasswordValid){
            return res.status(401).json({error: "Invalid Password"})
        }

        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET)
        user.token = token
        await user.save()
        return res.status(200).json({success: `User logged in and ${token} generated`})

    } catch (error) {
        console.error(error)
        return res.status(500).json({error: "Internal Server Error"})
    }
})