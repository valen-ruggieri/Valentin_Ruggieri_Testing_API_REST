require("dotenv").config();
const express = require("express");
const authPermissions = require("../../utils/middlewares/authPermissions");
const routerCart = express.Router();
const { userDao, cartsDao, productsDao } = require("../../DAOs/swicht");
const nodeMailer = require("nodemailer");
const transporter = nodeMailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: `${process.env.MAIL_USER}`,
    pass: `${process.env.MAIL_PASS}`,
  },
});
const twilio = require("twilio");
const twilioAccount = twilio(
  `${process.env.TWILIO_SID}`,
  `${process.env.TWILIO_TOKEN}`
);

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
  const cartInBase = await cartsDao.getAll();
  const products = cartInBase[0] ? cartInBase[0].products : [];
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

  products.length
    ? await cartsDao.updateById(cartInBase[0]._id, { ...cart })
    : await cartsDao.create({ ...cart }),
    res.redirect("/store");
});
routerCart.get("/cart/deleteproduct/:id", authPermissions, async (req, res) => {
  const id = req.params.id;
  const product = await productsDao.getById(id);
  const cartInBase = await cartsDao.getAll();
  const products = cartInBase[0] ? cartInBase[0].products : [];
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

  await cartsDao.updateById(cartInBase[0]._id, { ...cart });

  res.redirect("/cart");
});

routerCart.get("/cart/deleteall", authPermissions, async (req, res) => {
  await cartsDao.deleteAll();
  res.redirect("/cart");
});

routerCart.get("/cart/buyAll", authPermissions, async (req, res) => {
  const buyerTicket = await cartsDao.getAll();
  const querysnapshot = buyerTicket[0].products;
  const precioTotal = buyerTicket[0].precioTotal;
  const listEmail = querysnapshot.map(
    (e, index) =>
      `<div>
      <h3>Producto ${index + 1} </h3>
      <h4> titulo: ${e.titulo}</h4>
      <h4> precio: $${e.precio} </h4>
      <h4>cantidad: ${e.cant} </h4>
      <h4>codigo: ${e.codigo}</h4>
      <h4>subtotal: $${e.precio * e.cant}</h4>
      </div>`
  );
  const listWsp = querysnapshot.map(
    (e, index) =>
      `
  Producto ${index + 1} 

      titulo: ${e.titulo}
      precio: $${e.precio} 
      cantidad: ${e.cant} 
      codigo: ${e.codigo}
      subtotal: $${e.precio * e.cant}
      
      `
  );
  const { email, user, phone } = await userDao.getById(
    req.session.passport.user
  );

  const mailOptions = {
    from: "ShopBasic <valeru.251@gmail.com>",
    to: email,
    subject: `Nuevo pedido de ${user}`,
    html: `<h1>Gracias por comprar en shopBasic!! 🤝</h1>
     <h2>Datos de registro</h2>
     <h4>Nombre: ${user}</h4>
     <h4>Email: ${email}</h4>
     <h2>Lista de productos</h2>
     ${listEmail.join("")}
     <h3>Total: $${precioTotal}</h3>

   `,
  };
  twilioAccount.messages
    .create({
      body: `
      Hola ${user}!! 
    Tu pedido se encuentra en proceso 🛒✔

    Lista de productos:

      ${listWsp.join("")}

      Total: $${precioTotal}`,
      from: "whatsapp:+14155238886",
      to: `whatsapp:+549${phone}`,
    })
    .then(() => console.log("enviado"))
    .catch((err) => console.log(err));
  await transporter.sendMail(mailOptions);
  res.redirect("/cart");
});

module.exports = routerCart;
