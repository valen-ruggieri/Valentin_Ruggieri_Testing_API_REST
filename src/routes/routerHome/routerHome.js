require("dotenv").config();
const express = require("express");
const getHome = require("../../controllers/controllerHome");
const routerHome = express.Router();

routerHome.get("/", getHome);

module.exports = routerHome;
