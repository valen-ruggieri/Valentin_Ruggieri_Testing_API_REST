require("dotenv").config();
const option = process.env.DB_CONNECTION;
const logger = require("../../utils/loggers/loggers");
const MongoDBUser = require("../../DAOs/users/MongoDBUserSessions");

let userDao;
switch (option) {
  case "mongoDB":
     userDao = new MongoDBUser();
    break;
  case "firebase":
    logger.info("firebaseDB active");
  case "SQL":
    logger.info("SQL active");
  default:
     userDao = new MongoDBUser();
}

module.exports = userDao;
