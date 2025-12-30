const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const userRouter = require('./controllers/user')
const mongoose = require('mongoose')
const loginRouter = require('./controllers/login')

mongoose.set('strictQuery', false)
console.log('Conectando a: ', config.MONGODB_URI);

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    console.log('Conexión exitosa');
  })
  .catch((error) => {
    console.log('Error en la conexión', error);
  })


app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))

app.use(express.json())
app.use(cookieParser())
app.use('/login', loginRouter)
app.use('/api/users', userRouter)

module.exports = app