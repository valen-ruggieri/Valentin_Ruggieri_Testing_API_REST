const express = require("express");
const routerLogOut = express.Router();
const { userDao, sessionDao } = require("../../DAOs/swicht");

routerLogOut.get("/logout", async (req, res) => {
 setTimeout(async()=>{
 await sessionDao.deleteAll()
  .then(()=>{
    console.log('las sesiones fueron eliminadas correctamente')
  })
  .catch(err=>{
    console.log('No se pudieron eliminar las sesiones '+err)
  })
  res.redirect("/");
 },800)
});

routerLogOut.get("/deleteuser", async (req, res) => {
  await sessionDao.deleteAll()
  .then(()=>{
    console.log('las sesiones fueron eliminadas correctamente')
  })
  .catch(err=>{
    console.log('No se pudieron eliminar las sesiones '+err)
  })
  await userDao
    .deleteById( req.session.passport.user)
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log("no se pudo eliminar la cuenta" + err);
    });
  
});

module.exports = routerLogOut;
