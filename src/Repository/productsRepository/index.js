const productsDao = require("../../Factorys/productsFactory");
const logger = require("../../utils/loggers/loggers");

const createProduct = async (data) => {
  try { 
    await productsDao.create({ ...data });
  } catch (error) {
    logger.error(error);
  }
};

const deleteProductById = async (id) => {
  try {
    await productsDao.deleteById(id);
  } catch (error) {
    logger.error(error);
  }
};

const editProduct = async (id, data) => {
  try {
  } catch (error) {
    logger.error(error);
  }
};

const searchProductById = async (id) => {
  try {
    const product = await productsDao.getById(id);
    return product;
  } catch (error) {
    logger.error(error);
  }
};

const updateProductById = async (id, data) => {
  try {
    await productsDao.updateById(id, { ...data });
  } catch (error) {
    logger.error(error);
  }
};
const getAllProducts = async () => {
  try {
    const products = productsDao.getAll();
    return products;
  } catch (error) {
    logger.error(error);
  }
};

module.exports = {
  createProduct,
  deleteProductById,
  editProduct,
  searchProductById,
  getAllProducts,
  updateProductById,
};
