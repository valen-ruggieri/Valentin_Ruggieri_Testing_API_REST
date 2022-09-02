const mongoose = require("mongoose");
const logger = require("../utils/loggers/loggers");

require("dotenv").config();
mongoose
  .connect(process.env.URI)
  .then(() => {
   logger.info("Conectado con exito a mongoDB 🍃");
  })
  .catch((err) => {
    logger.info(err);
  });
