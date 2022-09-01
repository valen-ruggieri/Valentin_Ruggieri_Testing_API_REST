const mongoose = require("mongoose");
const { Schema } = mongoose;
const productSchema = new Schema({
  titulo: { type: String, unique: true, required: true },
  descripcion: { type: String, unique: true, required: true },
  timestamp: { type: String, unique: true, required: true },
  precio: { type: Number, required: true },
  img: { type: String, unique: true, required: true },
  codigo: { type: String, unique: true, required: true },
});

module.exports = productSchema;
