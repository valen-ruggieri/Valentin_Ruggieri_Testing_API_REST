const MongoDBClass = require("../../containers/mongoDBClass");
const sessionSchema = require("../../models/sessionSchema");



class MongoDBSession extends MongoDBClass {
  constructor() {
    super("sessions",sessionSchema );
  }

 
}


module.exports = MongoDBSession ;
