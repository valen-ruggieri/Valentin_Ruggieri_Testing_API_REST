const mongoose = require("mongoose");
require("dotenv").config();
mongoose
  .connect(process.env.URI)
  .then(() => {
    console.log("conectado con exito a mongoDB");
  })
  .catch((err) => {
    consople.log(err);
  });
