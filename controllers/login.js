const jwt = require('jsonwebtoken')
const loginRouter = require('express').Router()
const User = require('../model/user')
const bcrypt = require('bcrypt')

loginRouter.post('/', async(req, res, next) => {
    const body = req.body
    const user = await User.findOne({username: body.username})
    const logged = user === null ? false : await bcrypt.compare(body.password, user.passwordHash)
    
    if(!logged || !user){
        return res.status(401).json({
            error: 'Invalid username or password'
        })
    }
    const userForToken = {
        username: user.username,
        id: user._id
    }

    const token = jwt.sign(userForToken, process.env.SECRET)
    res.status(200)
        .send({token, username: user.username, name: user.name, clientIp: req.ip})
})

module.exports = loginRouter