const { deleteSessionAll } = require("../../Repository/sessionsRepository");
const { deleteUserById } = require("../../Repository/usersRepository");
const logger = require("../../utils/loggers/loggers");

async function redirectToHome(res) {
  try {
    setTimeout(async () => {
      await deleteSessionAll();
      logger.info("las sesiones fueron eliminadas correctamente");
      res.redirect("/");
    }, 800);
  } catch (error) {
    logger.error(error);
  }
}

async function deleteUser(req) {
  try {
    await deleteUserById(req.session.passport.user);
  } catch (error) {
    logger.error(error);
  }
}

async function deleteSession() {
  try {
    await deleteSessionAll();
  } catch (error) {
    logger.error(error);
  }
}

async function deleteAccount(req, res) {
  try {
    await deleteSession();
    await deleteUser(req);
    res.redirect("/");
  } catch (error) {
    logger.error(error);
  }
}
module.exports = { redirectToHome, deleteAccount };
