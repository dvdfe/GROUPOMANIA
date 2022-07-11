const jwt = require('jsonwebtoken')
const {users} = require('../database/database.js')
const bcrypt = require('bcrypt')

function logUser(req, res){
    const {email, password} = req.body
    const user = getUser(email)
    if (user == null) return res.status(404).send("User not found")
    
    checkPassword(user, password)
    .then((isPasswordCorrect) =>{
        if (!isPasswordCorrect) return res.status(401).send("Wrong password")
        const token = makeToken(email)
        res.send({token: token, email: user.email})
    })
    .catch((err) => res.status(500).send(err))
}


function makeToken(email){
    return jwt.sign({email}, process.env.MDP, {expiresIn: "24h"})
}

function getUser(email){
    return users.find((user) => user.email === email)
}

function checkPassword(user, password){
    return bcrypt.compare(password, user.password)
}

function signupUser(req, res){
    const {email, password, confirmPassword} = req.body
    if (password !== confirmPassword) return res.status(400).send("Password don't match")
    const user = getUser(email)
    if (user != null) return res.status(400).send("User already exists")
    hashPassword(password)
    .then((hash) => {
        saveUser({email, password: hash})
        res.send({email: email, password: hash})
    })
    .catch((err) => new Error(err))
}

function saveUser(user){
    users.push(user)
}

function hashPassword(password){
    return bcrypt.hash(password, 10)
}

module.exports = {logUser, signupUser}