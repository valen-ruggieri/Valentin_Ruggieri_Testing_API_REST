require("dotenv").config();
const express = require("express");
const authPermissions = require("../../utils/middlewares/authPermissions");
const routerStore = express.Router();
const validationProduct = require("../../utils/middlewares/validationProducts");
const {
  getStore,
  getUpdateForm,
  getAddForm,
  postAddProduct,
  postUpdateProduct,
  deleteProduct,
} = require("../../controllers/controllerStore");

routerStore.get("/store", authPermissions, getStore);
routerStore.get("/store/updateproduct/:id", authPermissions, getUpdateForm);

routerStore.get("/store/addproduct", authPermissions, getAddForm);

routerStore.post(
  "/store/addproduct",
  authPermissions,
  validationProduct("add"),
  postAddProduct
);

routerStore.post(
  "/store/updateproduct/:id",
  authPermissions,
  validationProduct("update"),
  postUpdateProduct
);

routerStore.get("/store/deleteproduct/:id", authPermissions, deleteProduct);

module.exports = routerStore;
