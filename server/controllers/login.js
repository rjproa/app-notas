const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')
const generateTokens = require('./helpers/generateTokens')

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body
  try {
    const user = await User.findOne({ username })
    const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.passwordHash)

    if (!(user && passwordCorrect)) {
      return res.status(401).json({
        error: 'username o password invalido'
      })
    }

    const { accessToken, refreshToken } = generateTokens(user)

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000
    })

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    })

    res.status(200).json({
      id: user._id,
      username: user.username,
      name: user.name,
      email: user.email
    })

  } catch (error) {
    console.error('Error en login:', error)
    res.status(500).json({ error: 'Error en el servidor' })
  }

})

loginRouter.post('/logout', async (req, res) => {
  res.clearCookie('accessToken')
  res.clearCookie('refreshToken')
  res.status(200).json({ message: 'Logout Exitoso' })
})

module.exports = loginRouter