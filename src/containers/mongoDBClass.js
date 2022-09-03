const mongoose = require("mongoose");
const logger = require("../utils/loggers/loggers");

class MongoDBClass {
  constructor(collectionName, docSchema) {
    this.collection = mongoose.model(collectionName, docSchema);
  }
  async getAll() {
    try {
      const all = await this.collection.find().lean();
      return all;
    } catch (error) {
      logger.error(err);
    }
  }

  async getById(id) {
    try {
      const one = await this.collection.findById(id).lean();
      return one;
    } catch (error) {
       logger.error(err);
    }
  }

  async getByUser(data){
    try {
      const one = await this.collection.find({email:data.email}).lean();
     
      return one[0];
    } catch (error) {
       logger.error(err);
    }
  }

  async countAll() {
    try {
      const all = await this.collection.find().count();
      return all;
    } catch (error) {
       logger.error(err);
    }
  }
  async create(doc) {
    try {
      const one = await this.collection.create(doc);
      return one
    } catch (error) {
      logger.error(err);
    }
  }
  async deleteById(id) {
    try {
      const one = await this.collection.findById(id).deleteOne();
    } catch (error) {
      logger.error(err);
    }
  }

  async deleteAll() {
    try {
      const all = await this.collection.deleteMany();
    } catch (error) {
       logger.error(err);
    }
  }
  async updateById(id, doc) {
    try {
      const one = await this.collection.findByIdAndUpdate(id, doc);
    } catch (error) {
       logger.error(err);
    }
  }
  async getByEmail(data){
    try {
      const one = await this.collection.find({email:data}).lean();
     
      return one[0];
    } catch (error) {
       logger.error(err);
    }
  }
}

module.exports = MongoDBClass;