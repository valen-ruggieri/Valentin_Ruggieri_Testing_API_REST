const mongoose = require("mongoose");
const { Schema } = mongoose;
const cartsSchema = new Schema({
  timestamp: { type: String,  required: false },
  precioTotal: { type: Number, required: true },
  products: {type: Array}
});



module.exports = cartsSchema;