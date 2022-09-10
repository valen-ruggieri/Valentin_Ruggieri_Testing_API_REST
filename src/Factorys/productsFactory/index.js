require("dotenv").config();
const option = process.env.DB_CONNECTION;
const logger = require("../../utils/loggers/loggers");
const MongoDBProducts = require("../../DAOs/products/mongoDBProducts");

let productsDao;
switch (option) {
  case "mongoDB":
    productsDao = new MongoDBProducts();
    break;
  case "firebase":
    logger.info("firebaseDB active");
  case "SQL":
    logger.info("SQL active");
  default:
    productsDao = new MongoDBProducts();
}

module.exports = productsDao;
