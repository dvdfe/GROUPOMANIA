const express = require('express')
const {getPosts, createPost, createComment, deletePost} = require('../controllers/posts')
const {checkToken} = require('../middleware/token')
const {imageUpload} = require('../middleware/image')

const postRouter = express.Router()

postRouter.use(checkToken)

postRouter.post("/:id", createComment)
postRouter.get("/", getPosts)
postRouter.post("/", imageUpload, createPost)
postRouter.delete("/:id", deletePost)


module.exports = {postRouter}