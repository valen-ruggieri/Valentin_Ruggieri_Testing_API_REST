const sessionDao = require("../../Factorys/sessionsFactory");
const logger = require("../../utils/loggers/loggers");

const createSession = async (data) => {
  try {
  } catch (error) {
    logger.error(error);
  }
};

const deleteSessionById = async (id) => {
  try {  await sessionDao.deleteById(id)
  } catch (error) {
    logger.error(error);
  }
};
const deleteSessionAll = async () => {
  try {  await sessionDao.deleteAll()
  } catch (error) {
    logger.error(error);
  }
};

const editSession = async (id, data) => {
  try {
  } catch (error) {
    logger.error(error);
  }
};

const searchSession = async (id) => {
  try {
  } catch (error) {
    logger.error(error);
  }
};

module.exports = { createSession, deleteSessionAll,deleteSessionById , editSession, searchSession };
