
const comment1 ={
    user: "velo@string.com",
    content: "C'est mon premier commentaire"
}
const comment2 ={
    user: "voiture@string.com",
    content: "C'est mon premier commentaire"
}


const post1 = {
    user: "string99@string.com",
    content: "c'est mon premier post !",
    url: "https://picsum.photos/400/200",
    comments: [comment1, comment2]
}
const post2 = {
    user: "string99@string.com",
    content: "c'est mon second post !",
    url: "https://picsum.photos/400/200",
    comments: [ comment2]
}
const post3 = {
    user: "string99@string.com",
    content: "c'est mon troisieme post !",
    url: "https://picsum.photos/400/200",
    comments: []
}

const posts = [post1, post2, post3]

function getPosts(req, res) {
    const email = req.email
    res.send({posts, email})
}

function createPost(req, res) {
    const content = req.body.content
    const email = req.email
    const post = {content, user: email, comments:[]}
    posts.unshift(post)
    res.send({post})
}

module.exports = {getPosts, createPost}