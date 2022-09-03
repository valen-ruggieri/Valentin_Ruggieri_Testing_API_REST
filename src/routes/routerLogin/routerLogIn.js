require("dotenv").config();
const express = require("express");
const {getLogIn,getLogInError,postLogIn,postLogInError} = require("../../controllers/controllerLogin");
const routerLogIn = express.Router();
const userschemaValidation = require("../../models/userSchemaValidation");
const userValidation = require("../../utils/middlewares/authValidation");
const validation = userValidation(userschemaValidation)

routerLogIn.get("/login", getLogIn);

routerLogIn.post("/login", validation , postLogIn);

routerLogIn.get("/loginerror", getLogInError);

routerLogIn.post( "/loginerror",validation,postLogInError);

module.exports = routerLogIn;
