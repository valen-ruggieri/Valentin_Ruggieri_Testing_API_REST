const app = require("./app");
const http = require('http')
const PORT = 8080;
require('./config/configMongoDB')
const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`Servidor listo en el puerto ${PORT} ✅`);
});
