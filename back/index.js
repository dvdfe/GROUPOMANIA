require("dotenv").config()
const express = require('express')
const port = process.env.PORT || 3001
const app = express()
const bodyParser = require('body-parser')
const {logUser, signupUser} = require('./controllers/users')
const cors = require('cors')
const { postRouter } = require("./routes/posts")

app.use(cors())
app.use(bodyParser.json())

app.use("/posts", postRouter)
app.post("/auth/login", logUser)
app.post("/auth/signup", signupUser)



app.listen(port, () => console.log(`Listening on port ${port}`))

