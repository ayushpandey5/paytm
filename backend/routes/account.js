const { Router } = require("express")
const router = Router()
const Account = require("../models/account")
const User = require("../models/users")
const authMiddleware = require("../middleware/auth")
const mongoose = require("mongoose")


router.get("/balance",authMiddleware, async(req,res) => {
    const userId = req.userId
    if(!userId){
        res.status(401).json({error: "Invalid account"})
    }
    const account = await Account.findOne({ userID: userId });
    if (!account) {
        return res.status(404).json({ error: "Account not found" });
    }
    res.status(200).json({balance: account.balance})

})

router.post("/transfer", authMiddleware, async(req, res) => {
    const userId = req.userId
    console.log(req.body)
    if(!userId){
        res.status(401).json({error: "Inalid account"})
    }
    const session = await mongoose.startSession();
    session.startTransaction();

    const {to, amount} = req.body

    const account = await Account.findOne({userID: userId}).session(session)

    if(!account || account.balance < amount){
        session.abortTransaction();
        return res.status(400).json({error: "Insufficient Balance"})
    }

    const toAccount = await Account.findOne({userID: to})
    if(!toAccount){
        session.abortTransaction()
        return res.status(400).json({error: "Invalid account"})
    }

    await Account.updateOne({userID: userId}, {$inc: {balance: -amount}}).session(session)
    await Account.updateOne({userId: to}, {$inc: {balance: amount}}).session(session)

    await session.commitTransaction();
    return res.status(200).json({success: "Transaction Successful"})
})

module.exports = router