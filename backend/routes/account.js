const { Router } = require("express")
const router = Router()
const Account = require("../models/account")
const User = require("../models/users")
const authMiddleware = require("../middleware/auth")


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

module.exports = router