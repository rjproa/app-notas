const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')
const generateTokens = require('./helpers/generateTokens.js')
const authMiddleware = require('../middlewares/authMiddleware.js')
const jwt = require('jsonwebtoken')

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  path: '/'
}

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
      ...cookieOptions,
      maxAge: 15 * 60 * 1000
    })

    res.cookie('refreshToken', refreshToken, {
      ...cookieOptions,
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
  res.clearCookie('accessToken', cookieOptions)
  res.clearCookie('refreshToken', cookieOptions)
  res.status(200).json({ message: 'Logout Exitoso' })
})

loginRouter.get('/verify', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-passwordHash')
    console.log(user);

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' })
    }

    res.status(200).json({
      id: user._id,
      username: user.username,
      name: user.name,
      email: user.email
    })
  } catch (error) {
    res.status(500).json({ error: 'Error en el servidor' })
  }
})

loginRouter.post('/refresh', async (req, res) => {
  const refreshToken = req.cookies.refreshToken

  if (!refreshToken) {
    return res.status(401).json({ error: 'No refresh token' })
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET)

    const user = await User.findById(decoded.id)
    if (!user) {
      return res.status(401).json({ error: 'Usuario no encontrado' })
    }

    const { accessToken } = generateTokens(user)

    res.cookie('accessToken', accessToken, {
      ...cookieOptions,
      maxAge: 15 * 60 * 1000
    })

    res.status(200).json({ message: 'Token refrescado' })

  } catch (error) {
    res.clearCookie('accessToken', cookieOptions)
    res.clearCookie('refreshToken', cookieOptions)
    return res.status(401).json({ error: 'Token inválido' })
  }
})

module.exports = loginRouter