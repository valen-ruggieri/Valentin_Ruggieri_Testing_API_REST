const { searchCartById, updateCartById } = require("../../Repository/cartsRepository");
const { searchUserById } = require("../../Repository/usersRepository");
const logger = require("../../utils/loggers/loggers");

async function searchProducts(id) {
  try {
    const { cartId } = await searchUserById(id);
    const cartInBase = await searchCartById(cartId);
    const products = cartInBase.products;
    return products ? products : [];
  } catch (error) {
    logger.error(error);
  }
}

async function searchCart(id) {
  try {
    const { cartId } = await searchUserById(id);
    const cartInBase = await searchCartById(cartId);
    return cartInBase;
  } catch (error) {
    logger.error(error);
  }
}

function findIndexProduct(products, product) {
  return products.findIndex((element) => element.codigo === product.codigo);
}

function addInCart(products, index, product) {
  let cartItems = [...products];
  products[index]
    ? (cartItems[index] = {
        ...product,
        cant: products[index] ? products[index].cant + 1 : 1,
      })
    : cartItems.push({
        ...product,
        cant: products[index] ? products[index].cant + 1 : 1,
      });
  return cartItems;
}

function deleteInCart(products, index, product) {
  let cartItems = [...products];
  products[index].cant > 1
    ? (cartItems[index] = {
        ...product,
        cant: products[index] ? products[index].cant - 1 : 1,
      })
    : (cartItems = cartItems.filter((e) => e.codigo !== product.codigo));
  return cartItems;
}

function calculateTotalPrice(cart) {
  const map = cart.map((element) => element.precio * element.cant);
  const precioReduce = map.reduce((a, b) => a + b, 0);
  return precioReduce;
}

async function reloadCart(precioTotal, products, cart) {
  const date = new Date();
  const timestamp = ` ${date.getDay()}/ ${date.getMonth()}/${date.getFullYear()} - ${date.getHours()}: ${date.getMinutes()}: ${date.getSeconds()}`;
  const data = {
    precioTotal: precioTotal,
    timestamp: timestamp,
    products: products,
  };

  await updateCartById(cart._id, { ...data });
}

async function deleteAllCart(cart) {
  const date = new Date();
  const timestamp = ` ${date.getDay()}/ ${date.getMonth()}/${date.getFullYear()} - ${date.getHours()}: ${date.getMinutes()}: ${date.getSeconds()}`;
  const data = {
    precioTotal: 0,
    timestamp: timestamp,
    products: [],
  };
  await updateCartById(cart._id, { ...data });
}

module.exports = {
  searchCart,
  searchProducts,
  findIndexProduct,
  addInCart,
  deleteInCart,
  calculateTotalPrice,
  reloadCart,
  deleteAllCart,
};
