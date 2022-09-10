require("dotenv").config();
const option = process.env.DB_CONNECTION;
const logger = require("../../utils/loggers/loggers");
const MongoDBCarts = require("../../DAOs/carts/mongoDBCarts");

let cartsDao;
switch (option) {
  case "mongoDB":
    cartsDao = new MongoDBCarts();
    break;
  case "firebase":
    logger.info("firebaseDB active");
  case "SQL":
    logger.info("SQL active");
  default:
    cartsDao = new MongoDBCarts();
}

module.exports = cartsDao;
