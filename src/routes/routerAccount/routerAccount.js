require("dotenv").config();
const express = require("express");
const getAccount = require("../../controllers/controllerAccount");
const authPermissions = require("../../utils/middlewares/authPermissions");
const routerAccount = express.Router();

routerAccount.get("/account", authPermissions, getAccount);
module.exports = routerAccount;
