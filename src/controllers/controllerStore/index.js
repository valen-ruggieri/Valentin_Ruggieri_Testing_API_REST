const { userDao, productsDao } = require("../../DAOs/swicht");
const productoConfig = require("../../services/servicesProducts");

const getStore = async (req, res) => {
  const sessionData = await userDao.getById(req.session.passport.user);
  const productos = await productsDao.getAll();
  res.render("store.ejs", { sessionData, productos });
};

const getUpdateForm = async (req, res) => {
  res.render("updateFormProducts.ejs");
};

const getAddForm = async (req, res) => {
  res.render("formAddProducts.ejs");
};

const deleteProduct = async (req, res) => {
  const id = req.params.id;
  await productsDao.deleteById(id);
  res.redirect("/store");
};

const postAddProduct = async (req, res) => {
  const product = productoConfig(req)
  await productsDao.create({ ...product });
  res.redirect("/store");
};

const postUpdateProduct = async (req, res) => {
  const id = req.params.id;
  const product = productoConfig(req)
  await productsDao.updateById(id, { ...product });
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
