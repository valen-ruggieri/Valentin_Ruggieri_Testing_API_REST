const cartsDao = require("../../Factorys/cartsFactory");
const logger = require("../../utils/loggers/loggers");

const createCart = async (data) => {
  try {
    const cart = await cartsDao.create({ ...data });
    return cart;
  } catch (error) {
    logger.error(error);
  }
};

const deleteCart = async (id) => {
  try {
  } catch (error) {
    logger.error(error);
  }
};

const editCart = async (id, data) => {
  try {
  } catch (error) {
    logger.error(error);
  }
};

const searchCartById = async (id) => {
  try {
    const cart = await cartsDao.getById(id);
    return cart;
  } catch (error) {
    logger.error(error);
  }
};

const updateCartById = async (id, data) => {
  try {
    await cartsDao.updateById(id, data);
  } catch (error) {
    logger.error(error);
  }
};

module.exports = {
  createCart,
  deleteCart,
  editCart,
  searchCartById,
  updateCartById,
};
