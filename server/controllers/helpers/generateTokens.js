  const jwt = require('jsonwebtoken')

  const generateTokens = (user) => {
    const userForToken = {
      username: user.username,
      id: user._id
    }

    const accessToken = jwt.sign(
      userForToken,
      process.env.SECRET,
      { expiresIn: '15m' }
    )

    const refreshToken = jwt.sign(
      userForToken,
      process.env.REFRESH_SECRET,
      { expiresIn: '7d' }
    )

    return { accessToken, refreshToken }
  }

  module.exports = generateTokens