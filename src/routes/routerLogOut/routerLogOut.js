const express = require("express");
const { logOut, deleteUser } = require("../../controllers/controllerLogOut");
const routerLogOut = express.Router();

routerLogOut.get("/logout", logOut);

routerLogOut.get("/deleteuser", deleteUser);

module.exports = routerLogOut;
