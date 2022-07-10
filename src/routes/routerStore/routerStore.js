require('dotenv').config()
const express = require("express");
const authPermissions = require('../../utils/middlewares/authPermissions');
const routerStore = express.Router();
const {faker} =require('@faker-js/faker');
const { userDao } = require('../../DAOs/swicht');



routerStore.get("/store", authPermissions, async(req, res) => {

const sessionData = await userDao.getById(req.session.passport.user)

  const productos = [];
  for (let i = 0; i < 8; i++) {
    const randomProduct = faker.commerce.productName();
    const randomPrice = faker.commerce.price();
    const randomImg = faker.image.image(480, 860, true);
    const randomDescription = faker.random.words(8);
    const randomCode = faker.random.alphaNumeric(4);
    productos.push({
      titulo: randomProduct,
      precio: randomPrice,
      img: randomImg,
      descripcion: randomDescription,
      codigo: randomCode,
    })}
   
  res.render("store.ejs", { sessionData, productos});
});

module.exports = routerStore;
