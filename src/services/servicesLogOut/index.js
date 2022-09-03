const { userDao, sessionDao } = require("../../DAOs/swicht");
const logger = require("../../utils/loggers/loggers");

async function redirectToHome(res) {
  try {
    setTimeout(async () => {
      await sessionDao.deleteAll();
      logger.info("las sesiones fueron eliminadas correctamente");
      res.redirect("/");
    }, 800);
  } catch (error) {
    logger.error(error);
  }
}

async function deleteUser(req) {
  try {
    await userDao.deleteById(req.session.passport.user);
  } catch (error) {
    logger.error(error);
  }
}

async function deleteSession() {
  try {
    await sessionDao.deleteAll();
  } catch (error) {
    logger.error(error);
  }
}

async function deleteAccount(req,res) {
  try {
    await deleteSession();
    await deleteUser(req);
    res.redirect("/");
  } catch (error) {
    logger.error(error);
  }
}
module.exports = { redirectToHome, deleteAccount };
