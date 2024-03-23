const { Router } = require("express")
const router = Router()
const userRoter = require("./users")

router.use("/user", userRouter)

module.exports = router