const { Router } = require("express")
const User = require("../models/user.model")
const nodemailer = require("nodemailer");
const router = Router()

router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    await User.create({
        username,
        email,
        password
    })
    return res
    .status(201)
    .json({msg: "Signup Success"})
})

router.post('/signin', async (req, res) => {
    try {
        const { username, password } = req.body
        const token = await User.matchPasswordAndGenerateToken(username, password)
        return res
        .status(200)
        .cookie('token', token)
        .json(
            {
                msg: 'Login Successful'
            }
        )
    } catch (error) {
        return res.send(error);
    }
})

router.post('/forgetPassword', (req, res) => {
    const { email } = req.body
    User.findOne({ email: email })
    .then(user => {
        if (!user) {
            // User not found
            return res.status(404).json({ message: "User not found" });
        }
        
        res.json({ message: "Password reset instructions sent to " + email });
  })
  .catch(err => {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  })
    
})

module.exports = router