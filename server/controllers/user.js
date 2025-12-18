const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.post('/', async (req, res) => {
  const { username, name, email, password } = req.body
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  try {
    const user = new User({
      username,
      name,
      email,
      passwordHash,
    })
    const savedUser = await user.save()
    res.status(201).json(savedUser)

  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        error: 'El nombre de usuario ya existe'
      })
    }
  }

})

userRouter.get('/', async (req, res) => {
  const users = await User.find({})

  res.status(200).json(users)
})

module.exports = userRouter