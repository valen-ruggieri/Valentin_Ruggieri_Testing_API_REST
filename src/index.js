const app = require("./app");
const http = require('http')
const PORT = 8080;
const server = http.createServer(app);
require('./config/configMongoDB')
server.listen(PORT, () => {
  console.log(`Servidor listo en el puerto ${PORT} ✅`);
});
