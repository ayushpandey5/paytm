const jwt = require("jsonwebtoken")

const authMiddleware = (req, res, next) => {
    const header = req.headers.authorization

    if(!header || !header.startsWith('Bearer')){
        return res.status(401).json({})
    }

    const token = header.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.userId = decoded.userId
        next()
    } catch (error) {
        console.error(error)
        return res.status(500).json({error: "Internal Server Error", error})
    }
}

module.exports = authMiddleware