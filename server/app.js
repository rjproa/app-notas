const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const userRouter = require('./controllers/user')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)
console.log('Conectando a: ', config.MONGODB_URI);

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    console.log('Conexión exitosa');
  })
  .catch((error) => {
    console.log('Error en la conexión', error);
  })


app.use(cors())
app.use(express.json())
app.use('/api/users', userRouter)

module.exports = app