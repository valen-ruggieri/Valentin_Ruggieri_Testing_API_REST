require('dotenv').config()
const express = require("express");
const authPermissions = require('../../utils/middlewares/authPermissions');
const routerStore = express.Router();
const {faker} =require('@faker-js/faker')
const cookieParser = require("cookie-parser");


routerStore.use(cookieParser("secret"));

routerStore.get("/store", authPermissions, (req, res) => {
  const sessionData = req.session;
  const productos = [];
  // Ciclo de creacion de datos de manera aleatoria proprocionando los campos requeridos para cada producto
  for (let i = 0; i < 8; i++) {
    const randomProduct = faker.commerce.productName();
    const randomPrice = faker.commerce.price();
    const randomImg = faker.image.image(480, 860, true);
    const randomDescription = faker.random.words(8);
    const randomCode = faker.random.alphaNumeric(4);

    // Incorporacion de los productos al mock
    productos.push({
      titulo: randomProduct,
      precio: randomPrice,
      img: randomImg,
      descripcion: randomDescription,
      codigo: randomCode,
    })}
   
  res.render("store.ejs", { sessionData , productos});
});

module.exports = routerStore;
