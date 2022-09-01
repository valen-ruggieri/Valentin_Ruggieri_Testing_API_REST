const MongoDBClass = require("../../containers/mongoDBClass");
const cartsSchema = require("../../models/cartsSchema");




class MongoDBCarts extends MongoDBClass {
  constructor() {
    super("carts",cartsSchema );
  }

 
}


module.exports = MongoDBCarts ;
