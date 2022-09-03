const { userDao, cartsDao, productsDao } = require("../../DAOs/swicht");
const sendToWsp = require("../../utils/twilio/twilio");
const { sendMailTicket } = require("../../utils/nodeMailer/nodeMailer");
const {
  searchCart,
  searchProducts,
  findIndexProduct,
  addInCart,
  calculateTotalPrice,
  reloadCart,
  deleteInCart,
  deleteAllCart,
} = require("../../services/servicesCart");

const getCart = async (req, res) => {
  const sessionData = await userDao.getById(req.session.passport.user);
  const cart = await searchCart(req.session.passport.user);
  res.render("cart.ejs", {
    sessionData,
    precioTotal: cart ? cart.precioTotal : 0,
    productos: cart ? cart.products : [],
  });
};

const addproduct = async (req, res) => {
  const id = req.params.id;
  const product = await productsDao.getById(id);
  const cartInBase = await searchCart(req.session.passport.user);
  const products = await searchProducts(req.session.passport.user);
  const index = findIndexProduct(products, product);
  const cartItems = addInCart(products, index, product);
  const precioTotal = calculateTotalPrice(cartItems);
  await reloadCart(precioTotal, cartItems, cartInBase);
  res.redirect("/store");
};

const deleteproduct = async (req, res) => {
  const id = req.params.id;
  const product = await productsDao.getById(id);
  const cartInBase = await searchCart(req.session.passport.user);
  const products = await searchProducts(req.session.passport.user);
  const index = findIndexProduct(products, product);
  const cartItems = deleteInCart(products, index, product);
  const precioTotal = calculateTotalPrice(cartItems);
  await reloadCart(precioTotal, cartItems, cartInBase);
  res.redirect("/cart");
};

const deleteAll = async (req, res) => {
  const cartInBase = await searchCart(req.session.passport.user);
  await deleteAllCart(cartInBase);
  res.redirect("/cart");
};

const buyAll = async (req, res) => {
  const { email, user, phone } = await userDao.getById(
    req.session.passport.user
  );
  const { products, precioTotal } = await searchCart(req.session.passport.user);
  sendToWsp(products, precioTotal, user, phone);
  sendMailTicket(products, precioTotal, email, user);

  res.redirect("/cart");
};

module.exports = { getCart, addproduct, deleteproduct, deleteAll, buyAll };
