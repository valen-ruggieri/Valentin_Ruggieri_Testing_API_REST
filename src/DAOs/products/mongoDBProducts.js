const MongoDBClass = require("../../containers/mongoDBClass");
const productSchema = require("../../models/productsSchema");

class MongoDBProducts extends MongoDBClass {
  constructor() {
    super("products", productSchema);
  }
}

module.exports = MongoDBProducts;
