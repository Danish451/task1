const JWT = require('jsonwebtoken')
const dotenv = require("dotenv");
dotenv.config();

const secret = process.env.SECRET

function createTokenForUser(user) {
    const payload = {
        _id: user._id,
        email: user.email,
        username: user.username
    }

    const token = JWT.sign(payload, secret)
    return token
}

module.exports = {
    createTokenForUser
}