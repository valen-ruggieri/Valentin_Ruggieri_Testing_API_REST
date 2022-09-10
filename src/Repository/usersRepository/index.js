const userDao = require("../../Factorys/usersFactory");
const logger = require("../../utils/loggers/loggers");

const createUser = async (data) => {
  try {
    const user = await userDao.create(data);
    return user;
  } catch (error) {
    logger.error(error);
  }
};

const deleteUserById = async (id) => {
  try {
    await userDao.deleteById(id);
  } catch (error) {
    logger.error(error);
  }
};

const editUser = async (id, data) => {
  try {
  } catch (error) {
    logger.error(error);
  }
};

const searchUserById = async (id) => {
  try {
    const user = await userDao.getById(id);
    return user;
  } catch (error) {
    logger.error(error);
  }
};
const searchUserByEmail = async (email) => {
  try {
    const user = await userDao.getByUser({ email });
    return user;
  } catch (error) {
    logger.error(error);
  }
};

const encryptPassword = async (password) => {
  try {
    const pass = userDao.encryptPassword(password);
    return pass;
  } catch (error) {
    logger.error(error);
  }
};

const comparePassword = async (password, userPassword) => {
  try {
    const result = await userDao.comparePassword(password, userPassword);
    return result;
  } catch (error) {
    logger.error(error);
  }
};

module.exports = {
  createUser,
  deleteUserById,
  editUser,
  searchUserById,
  searchUserByEmail,
  encryptPassword,
  comparePassword,
};
