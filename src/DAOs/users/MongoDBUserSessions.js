const MongoDBClass = require("../../containers/mongoDBClass");
const usersSchema = require("../../models/userSession");



 class MongoDBUser extends MongoDBClass{
    constructor(){
        super('UsersSession',usersSchema)
    }
 }

 module.exports = MongoDBUser;