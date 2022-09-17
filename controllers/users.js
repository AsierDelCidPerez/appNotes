const userRouter = require('express').Router()
const User = require('../model/user')
const bcrypt = require('bcrypt')

userRouter.get('/', async(req, res) => {
    res.json(await User.find({}).populate('notes'))
})

userRouter.post('/', async(req, res) => {
    const body = req.body;
    const passwordHash = await bcrypt.hash(body.password, 10)
    const newUser = new User({
        username: body.username,
        name: body.name,
        passwordHash
    })
    res.json(await newUser.save())
})

module.exports = userRouter;