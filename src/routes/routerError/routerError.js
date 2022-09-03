const express = require("express");
const getError = require("../../controllers/controllerError");
const routerError = express.Router();

routerError.get("/errorExpiredSession", getError );
module.exports = routerError;
