require("dotenv").config()
const express = require('express')
const app = express()

app.listen(port, () => console.log(`Listening on port ${port}`))

const port = process.env.PORT || 3000
console.log("running port:",port);