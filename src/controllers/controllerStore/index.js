const {
  getAllProducts,
  createProduct,
  updateProductById,
  deleteProductById,
} = require("../../Repository/productsRepository");
const { searchUserById } = require("../../Repository/usersRepository");

const productoConfig = require("../../services/servicesProducts");

const getStore = async (req, res) => {
  if (req.session.passport) {
    const sessionData = await searchUserById(req.session.passport.user);
    const productos = await getAllProducts();

    res.render("store.ejs", { sessionData, productos });
  } else {
    const productos = await getAllProducts();
    res.json(productos);
  }
};

const getUpdateForm = async (req, res) => {
  res.render("updateFormProducts.ejs");
};

const getAddForm = async (req, res) => {
  res.render("formAddProducts.ejs");
};

const deleteProduct = async (req, res) => {
  const id = req.params.id;
  await deleteProductById(id);
  res.redirect("/store");
};

const postAddProduct = async (req, res) => {
  const product = productoConfig(req);
  await createProduct(product);
  res.redirect("/store");
};

const postUpdateProduct = async (req, res) => {
  const id = req.params.id;
  const product = productoConfig(req);
  await updateProductById(id, product);
  res.redirect("/store");
};

module.exports = {
  getAddForm,
  getUpdateForm,
  getStore,
  postAddProduct,
  postUpdateProduct,
  deleteProduct,
};
