require("dotenv").config();
const express = require("express");
const authPermissions = require("../../utils/middlewares/authPermissions");
const routerStore = express.Router();
const { faker } = require("@faker-js/faker");
const { userDao, productsDao } = require("../../DAOs/swicht");

routerStore.get("/store", authPermissions, async (req, res) => {
  const sessionData = await userDao.getById(req.session.passport.user);

  const productos = await productsDao.getAll();
  res.render("store.ejs", { sessionData, productos });
});
routerStore.get(
  "/store/updateproduct/:id",
  authPermissions,
  async (req, res) => {
    res.render("updateFormProducts.ejs");
  }
);

routerStore.get("/store/addproduct", authPermissions, async (req, res) => {
  res.render("formAddProducts.ejs");
});

routerStore.post("/store/addproduct", authPermissions, async (req, res) => {
  const { titulo, precio, descripcion, codigo } = req.body;
  const img = req.file.filename;
  const precioFormat = Number(precio);
  const date = new Date();
  const timestamp = ` ${date.getDay()}/ ${date.getMonth()}/${date.getFullYear()} - ${date.getHours()}: ${date.getMinutes()}: ${date.getSeconds()}`;
  const product = {
    titulo,
    precio: precioFormat,
    descripcion,
    codigo,
    img,
    timestamp,
  };

  await productsDao.create({ ...product });

  res.redirect("/store");
});

routerStore.post(
  "/store/updateproduct/:id",
  authPermissions,
  async (req, res) => {
    const id = req.params.id;
    const { titulo, precio, descripcion, codigo } = req.body;
    const img = req.file.filename;
    const precioFormat = Number(precio);
    const date = new Date();
    const timestamp = ` ${date.getDay()}/ ${date.getMonth()}/${date.getFullYear()} - ${date.getHours()}: ${date.getMinutes()}: ${date.getSeconds()}`;
    const product = {
      titulo,
      precio: precioFormat,
      descripcion,
      codigo,
      img,
      timestamp,
    };
    await productsDao.updateById(id, { ...product });
    res.redirect("/store");
  }
);

routerStore.get(
  "/store/deleteproduct/:id",
  authPermissions,
  async (req, res) => {
    const id = req.params.id;
    await productsDao.deleteById(id);
    res.redirect("/store");
  }
);

module.exports = routerStore;
