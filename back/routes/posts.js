const express = require('express')
const {getPosts, createPost} = require('../controllers/posts')
const {checkToken} = require('../middleware/token')
const {imageUpload} = require('../middleware/image')


const postRouter = express.Router()

postRouter.use(checkToken)
postRouter.get("/", getPosts)
postRouter.post("/", imageUpload, createPost)


module.exports = {postRouter}