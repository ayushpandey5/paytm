const express = require("express")
const cors = require("cors")
const app = express()
const rootRoutes = require("./routes/index")

require("./db/db")

app.use(cors())
app.use(express.json())

app.use("/api/v1", rootRoutes)

app.listen(process.env.PORT, () => {
    console.log(`Servers Running in ${process.env.PORT}`)
})