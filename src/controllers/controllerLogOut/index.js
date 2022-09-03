const {
  redirectToHome,
  deleteAccount,
} = require("../../services/servicesLogOut");

const logOut = async (req, res) => {
  await redirectToHome(res);
};
const deleteUser = async (req, res) => {
  await deleteAccount(req,res);
};

module.exports = { deleteUser, logOut };
