const config = require('./utils/config')
const app = require('./app')

app.listen(config.PORT, '0.0.0.0', () => {
  console.log(`Servidor corriendo en el puerto ${config.PORT}`);
})