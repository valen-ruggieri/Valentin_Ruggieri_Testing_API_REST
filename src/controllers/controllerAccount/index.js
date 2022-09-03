const { userDao } = require("../../DAOs/swicht");

const getAccount = async (req, res) => {
  const sessionData = await userDao.getById(req.session.passport.user);
  const account = await userDao.getAll();
  res.render("account.ejs", { account: account[0], sessionData });
};

module.exports = getAccount;
