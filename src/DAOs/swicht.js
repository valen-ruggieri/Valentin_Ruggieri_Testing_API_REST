
require("dotenv").config();

let userDao;
let sessionDao;

switch (process.env.DB_CONNECTION) {
  case "mongoDB":
    console.log("mongoDB active");
   

    const MongoDBUser = require("./users/MongoDBUserSessions");
    userDao = new MongoDBUser();

    const MongoDBSession= require("./sessions/mongoDBSessions");
    sessionDao = new MongoDBSession();

    break;
  case "firebase":
    console.log("firebaseDB active");
 
    break;
  case "SQL":
    console.log("SQL active");
  

    
    break;
  default:
    throw new Error("No se ha definido una conexión a la base de datos");
}

module.exports = {  userDao , sessionDao};