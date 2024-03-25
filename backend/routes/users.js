const { Router } = require('express');
const router = Router();
const {UserType, SignInType, UpdateUserDetailsType} = require("../utils/types")
const User = require('../models/users')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const authMiddleware = require("../middleware/auth");
const Account = require('../models/account');

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
    
        const newUser = await User.create({
            username: username,
            email:email,
            password: hashedPassword
        })
    
        await Account.create({
            userID: newUser._id,
            balance: 1 + Math.random() * 10000
        })

        return res.status(202).json({success: "User created successfully", userId: newUser._id})
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
        user.tokens.push(token)
        await user.save()
        return res.status(200).json({success: `User logged in `, token: token})

    } catch (error) {
        console.error(error)
        return res.status(500).json({error: "Internal Server Error"})
    }
})

router.patch("/user", authMiddleware, async(req, res) => {
    const {username, password} = req.body
    const parsed = UpdateUserDetailsType.safeParse({username, password})

    if(parsed.error){
        return res.status(400).json({error: "Invalid Data"})
    }
    const userId = req.userId
    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        await User.updateOne({_id: userId}, {username: username, password: hashedPassword})
        return res.status(200).json({success: "User details updated"})
    } catch (error) {
        console.error(error)
        return res.status(500).json({error: "Internal Server Error", error})
    }
})

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            username: {
                "$regex": filter
            }
        }, {
            email: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            email: user.email,
            _id: user._id
        }))
    })
})

module.exports = router;