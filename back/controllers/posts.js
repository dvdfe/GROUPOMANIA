const { prisma } = require("../database/database");


async function getPosts(req, res) {
  const email = req.email;
  const posts = await prisma.post.findMany({
    include: {
      comments: {
        orderBy: {
          createdAt: "asc",
        },
        include: {
          user: {
            select: {
              email: true,
            },
          },
        },
      },
      user: {
        select: {
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  res.send({ posts: posts, email });
}

async function createPost(req, res) {
  const content = req.body.content;
  const email = req.email;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    const userId = user.id;
    const post = { content, userId };
    addImageUrlToPost(req, post);

    const result = await prisma.post.create({ data: post });
    res.send({ post: result });
  } catch (err) {
    res.status(500).send({ error: "Problème lors de la publication" });
  }
}

function addImageUrlToPost(req, post) {
  const hasImage = req.file != null;
  if (!hasImage) return;
  let pathToImage = req.file.path;
  const protocol = req.protocol;
  const host = req.get("host");
  const url = `${protocol}://${host}/${pathToImage}`;
  post.imageUrl = url;
}

async function deletePost(req, res) {
  const postId = Number(req.params.id);
  try {
  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
    include: {
      user: {
        select: {
          email: true,
        },
      },
    },
  });
  if (post == null) {
    return res.status(404).send({ error: "La publication n'a pas été trouvé" });
  }
  const email = req.email;
  if (email !== post.user.email && email !== "admin@gmail.com") {
    return res
      .status(403)
      .send({ error: "Vous n'êtes pas le propriétaire de la publication" });
  }
  await prisma.comment.deleteMany({ where: {  postId } })
  await prisma.post.delete({ where: { id: postId } })
  res.send({ message: "Publication supprimée" })
} catch(err){
    res.status(500).send({ error: "Problème lors de la suppression de la publication" })
}
}

async function createComment(req, res) {
  const postId = Number(req.params.id);
  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: {
      user: {
        select: {
          id: true,
        },
      },
    },
  });
  if (post == null) {
    return res
      .status(404)
      .send({ error: "Erreur avec la publication du commentaire" });
  }

  const userCommenting = await prisma.user.findUnique({
      where: {email: req.email}
  })

  const userId = userCommenting.id

  const commentToSend = { userId, postId, content: req.body.comment };
  const comment = await prisma.comment.create({ data: commentToSend });
  res.send({ comment });
}

module.exports = { getPosts, createPost, deletePost, createComment };
