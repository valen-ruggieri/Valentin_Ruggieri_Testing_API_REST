require("dotenv").config();

let userDao;
let sessionDao;
let productsDao;
let cartsDao;

switch (process.env.DB_CONNECTION) {
  case "mongoDB":
    console.log("mongoDB active");

    const MongoDBUser = require("./users/MongoDBUserSessions");
    userDao = new MongoDBUser();

    const MongoDBSession = require("./sessions/mongoDBSessions");
    sessionDao = new MongoDBSession();

    const MongoDBProducts = require("./products/mongoDBProducts");
    productsDao = new MongoDBProducts();

    const MongoDBCarts = require("./carts/mongoDBCarts");
    cartsDao = new MongoDBCarts();

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

module.exports = { userDao, sessionDao, cartsDao, productsDao };
