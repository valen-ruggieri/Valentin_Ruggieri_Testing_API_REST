const MongoDBClass = require("../../containers/mongoDBClass");
const usersSchema = require("../../models/userSession");
const bcrypt =require('bcrypt');
class MongoDBUser extends MongoDBClass {
  constructor() {
    super("UsersSession", usersSchema);
  }

  comparePassword(password,userPassword) {
    return bcrypt.compare(password,userPassword);
  }
  encryptPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  }
}


module.exports = MongoDBUser;
