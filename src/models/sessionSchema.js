const mongoose = require("mongoose");
const { Schema } = mongoose;


const sessionSchema = new Schema({
  expires: { type: Date, required: true },
  session: { type: Object, unique: false, required: true },
});




module.exports = sessionSchema;
