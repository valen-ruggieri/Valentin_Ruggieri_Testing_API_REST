require("dotenv").config();
const option = process.env.DB_CONNECTION;
const logger = require("../../utils/loggers/loggers");
const MongoDBSession = require("../../DAOs/sessions/mongoDBSessions");

let sessionDao;
switch (option) {
  case "mongoDB":
    sessionDao = new MongoDBSession();
    break;
  case "firebase":
    logger.info("firebaseDB active");
  case "SQL":
    logger.info("SQL active");
  default:
    sessionDao = new MongoDBSession();
}

module.exports = sessionDao;
