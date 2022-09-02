require("dotenv").config();
const express = require("express");
const authPermissions = require("../../utils/middlewares/authPermissions");
const routerCart = express.Router();
const { userDao, cartsDao, productsDao } = require("../../DAOs/swicht");
const sendToWsp = require("../../utils/twilio/twilio");
const { sendMailTicket } = require("../../utils/nodeMailer/nodeMailer");
routerCart.get("/cart", authPermissions, async (req, res) => {
  const sessionData = await userDao.getById(req.session.passport.user);
  const cart = await cartsDao.getAll();

  res.render("cart.ejs", {
    sessionData,
    precioTotal: cart[0] ? cart[0].precioTotal : 0,
    productos: cart[0] ? cart[0].products : [],
  });
});

routerCart.get("/cart/addproduct/:id", authPermissions, async (req, res) => {
  const id = req.params.id;
  const product = await productsDao.getById(id);
  const { cartId} = await userDao.getById(
    req.session.passport.user
  );
  const cartInBase = await cartsDao.getById(cartId);
  const products = cartInBase ? cartInBase.products : [];
  const index = products.findIndex(
    (element) => element.codigo === product.codigo
  );
  const date = new Date();
  const timestamp = ` ${date.getDay()}/ ${date.getMonth()}/${date.getFullYear()} - ${date.getHours()}: ${date.getMinutes()}: ${date.getSeconds()}`;
  const cartItems = [...products];
  products[index]
    ? (cartItems[index] = {
        ...product,
        cant: products[index] ? products[index].cant + 1 : 1,
      })
    : cartItems.push({
        ...product,
        cant: products[index] ? products[index].cant + 1 : 1,
      });

  const map = cartItems.map((element) => element.precio * element.cant);
  const precioReduce = map.reduce((a, b) => a + b, 0);
  const cart = {
    precioTotal: precioReduce,
    timestamp: timestamp,
    products: cartItems,
  };

   await cartsDao.updateById(cartInBase._id, { ...cart })
   
    res.redirect("/store");
});

routerCart.get("/cart/deleteproduct/:id", authPermissions, async (req, res) => {
  const id = req.params.id;
  const product = await productsDao.getById(id);
  const { cartId} = await userDao.getById(
    req.session.passport.user
  );
  const cartInBase = await cartsDao.getById(cartId);
  const products = cartInBase ? cartInBase.products : null;
  const index = products.findIndex(
    (element) => element.codigo === product.codigo
  );
  const date = new Date();
  const timestamp = ` ${date.getDay()}/ ${date.getMonth()}/${date.getFullYear()} - ${date.getHours()}: ${date.getMinutes()}: ${date.getSeconds()}`;
  let cartItems = [...products];
  products[index].cant > 1
    ? (cartItems[index] = {
        ...product,
        cant: products[index] ? products[index].cant - 1 : 1,
      })
    : (cartItems = cartItems.filter((e) => e.codigo !== product.codigo));

  const map = cartItems.map((element) => element.precio * element.cant);
  const precioReduce = map.reduce((a, b) => a + b, 0);
  const cart = {
    precioTotal: precioReduce,
    timestamp: timestamp,
    products: cartItems,
  };
 
   await cartsDao.updateById(cartInBase._id, { ...cart })
   res.redirect("/cart");
});

routerCart.get("/cart/deleteall", authPermissions, async (req, res) => {
  const { cartId} = await userDao.getById(
    req.session.passport.user
  );
  const cartInBase = await cartsDao.getById(cartId);
  const date = new Date();
  const timestamp = ` ${date.getDay()}/ ${date.getMonth()}/${date.getFullYear()} - ${date.getHours()}: ${date.getMinutes()}: ${date.getSeconds()}`;
  const cart = {
    precioTotal: 0,
    timestamp: timestamp,
    products: [],
  }; 
  await cartsDao.updateById(cartInBase._id, { ...cart })

  res.redirect("/cart");
});

routerCart.get("/cart/buyAll", authPermissions, async (req, res) => {
  const buyerTicket = await cartsDao.getAll();
  const querysnapshot = buyerTicket[0].products;
  const precioTotal = buyerTicket[0].precioTotal;
  const { email, user, phone } = await userDao.getById(
    req.session.passport.user
  );
  sendToWsp(querysnapshot, precioTotal, user, phone);
  sendMailTicket(querysnapshot, precioTotal, email, user);

  res.redirect("/cart");
});

module.exports = routerCart;
