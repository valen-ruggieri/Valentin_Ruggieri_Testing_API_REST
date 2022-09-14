require("dotenv").config();
const cluster = require("cluster");
//const { getProducts, postProduct, updateProduct, deleteProduct } = require("./test/Axios/index.js");
const logger = require("./utils/loggers/loggers");
const numCPUs = require("os").cpus().length;

if (cluster.isMaster && process.env.CLUSTER === "on") {
  logger.info(`Master ${process.pid} is running ⚙`);
  logger.info(`Numero de procesadores: ${numCPUs}`);
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  cluster.on("exit", (worker, code, signal) => {
    logger.warn(`Worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  const app = require("./app");
  const http = require("http");
  const PORT = process.env.PORT || 8080;
  const server = http.createServer(app);
  require("./config/configMongoDB");
  require("./utils/passport/passport");
  // TEST CON AXIOS
  //getProducts();
  //postProduct(data);
  //updateProduct(id,data) 
  //deleteProduct(id)
  server.listen(PORT, () => {
    logger.info(`Servidor listo en el puerto ${PORT} ✅`);
  });
}
