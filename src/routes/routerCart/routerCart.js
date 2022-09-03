require("dotenv").config();
const express = require("express");
const {
  getCart,
  addproduct,
  deleteproduct,
  deleteAll,
  buyAll,
} = require("../../controllers/controllerCart");
const authPermissions = require("../../utils/middlewares/authPermissions");
const routerCart = express.Router();

routerCart.get("/cart", authPermissions, getCart);

routerCart.get("/cart/addproduct/:id", authPermissions, addproduct);

routerCart.get("/cart/deleteproduct/:id", authPermissions, deleteproduct);

routerCart.get("/cart/deleteall", authPermissions, deleteAll);

routerCart.get("/cart/buyAll", authPermissions, buyAll);

module.exports = routerCart;
