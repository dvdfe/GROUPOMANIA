const jwt = require("jsonwebtoken");
const { prisma } = require("../database/database.js");
const bcrypt = require("bcrypt");

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
    console.log("body:", body)
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

async function deleteUser(req, res){
  const email = req.body.email;
  console.log("req.body:", req.body)
  const deleteUser = await prisma.user.delete({

    where: { 
      email: email,
    },
  })
  res.json(deleteUser)
}

module.exports = { logUser, signupUser, deleteUser };
