const jwt = require("jsonwebtoken");
const { prisma } = require("../database/database.js");
const bcrypt = require("bcrypt");
const { deletePost } = require("./posts.js");

async function logUser(req, res) {
  const { email, password } = req.body;
  try {
    const user = await getUser(email);
    if (user == null)
      return res.status(404).send({ error: "Utilisateur introuvable" });

    const isPasswordCorrect = await checkPassword(user, password);
    if (!isPasswordCorrect)
      return res.status(401).send({ error: "Mauvais mot de passe" });
    const token = makeToken(email);
    res.send({ token: token, email: user.email });
  } catch (error) {
    res.status(500).send({ error });
  }
}

function makeToken(email) {
  return jwt.sign({ email }, process.env.MDP, { expiresIn: "24h" });
}

function getUser(email) {
  return prisma.user.findUnique({ where: { email } });
}

function checkPassword(user, password) {
  return bcrypt.compare(password, user.password);
}

async function signupUser(req, res) {
  const { email, password, confirmPassword } = req.body;
  try {
    if (password !== confirmPassword)
      return res
        .status(400)
        .send({ error: "Les mots de passe ne correspondent pas " });
    const userInDb = await getUser(email);
    if (userInDb != null)
      return res.status(400).send({ error: "L'utilisateur existe déja" });

    const hash = await hashPassword(password);
    const user = await saveUser({ email, password: hash });
    res.send({ user });
  } catch (error) {
    res.status(500).send({ error });
  }
}

function saveUser(user) {
  return prisma.user.create({ data: user });
}

function hashPassword(password) {
  return bcrypt.hash(password, 10);
}

async function deleteUser(req, res) {
  const email = req.body.email;
  const userInDb = await getUser(email);

  const deleteComment = await prisma.comment.deleteMany({
    where: {
      userId: userInDb.id,
    },
  });

  const findPosts = await prisma.post.findMany({
    where: {
      userId: userInDb.id,
    },
  });
  try {
    for (post of findPosts) {
      try {
        await prisma.comment.deleteMany({
          where: {
            postId: post.id,
          },
        });
      } catch (error) {
        throw new Error(
          "Erreur lors de la suppression des commentaires de l'utilisateur"
        );
      }
      await prisma.post.delete({
        where: {
          id: post.id,
        },
      });
    }
  } catch (error) {
    throw new Error(
      "Erreur lors de la suppression des publications de l'utilisateur"
    );
  }

  await prisma.user.delete({
    where: {
      id: userInDb.id,
    },
  });
  return res.sendStatus(200);
}

module.exports = { logUser, signupUser, deleteUser };
