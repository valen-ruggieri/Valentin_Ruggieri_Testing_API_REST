const express = require("express");
const routerLogOut = express.Router();
const { userDao, sessionDao } = require("../../DAOs/swicht");
const logger = require("../../utils/loggers/loggers");

routerLogOut.get("/logout", async (req, res) => {
  setTimeout(async () => {
    await sessionDao
      .deleteAll()
      .then(() => {
        logger.info("las sesiones fueron eliminadas correctamente");
      })
      .catch((err) => {
        logger.info("No se pudieron eliminar las sesiones " + err);
      });
    res.redirect("/");
  }, 800);
});

routerLogOut.get("/deleteuser", async (req, res) => {
  await userDao
    .deleteById(req.session.passport.user)
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      logger.info("no se pudo eliminar la cuenta" + err);
    });
  await sessionDao
    .deleteAll()
    .then(() => {
      logger.info("las sesiones fueron eliminadas correctamente");
    })
    .catch((err) => {
      logger.info("No se pudieron eliminar las sesiones " + err);
    });
});

module.exports = routerLogOut;
