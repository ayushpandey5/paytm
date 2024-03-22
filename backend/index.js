const express = require("express")
const cors = require("cors")
const app = express()
const userRoutes = require("./routes/users")

app.use(cors())
app.use(express.json())

//app.use("/api/v1/user", userRoutes)

app.listen(process.env.PORT, () => {
    console.log(`Servers Running in ${process.env.PORT}`)
})