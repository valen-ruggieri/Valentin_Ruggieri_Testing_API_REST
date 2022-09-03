require("dotenv").config();
const express = require("express");
const routerSignIn = express.Router();
const {
  getSignIn,
  getSignInError,
  postSignIn,
} = require("../../controllers/controllerSignIn");

routerSignIn.get("/signinerror", getSignInError);

routerSignIn.get("/signin", getSignIn);

routerSignIn.post("/signin", postSignIn);

module.exports = routerSignIn;
