require("dotenv").config()
const express = require('express')
const port = process.env.PORT || 3001
const app = express()
const bodyParser = require('body-parser')
const {logUser, signupUser, deleteUser} = require('./controllers/users')
const cors = require('cors')
const { postRouter } = require("./routes/posts")
app.use(cors())
app.use(bodyParser.json())
const {prisma} = require("./database/database")

// const { PrismaClient }= require('@prisma/client')
// const prisma = new PrismaClient()



app.use("/uploads", express.static("uploads"))
app.use("/posts", postRouter)
app.post("/auth/login", logUser)
app.post("/auth/signup", signupUser)
app.post("/deleteUser", deleteUser)



app.listen(port, () => console.log(`Listening on port ${port}`))

