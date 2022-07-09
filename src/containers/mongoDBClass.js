const mongoose = require("mongoose");

class MongoDBClass {
  constructor(collectionName, docSchema) {
    this.collection = mongoose.model(collectionName, docSchema);
  }
  async getAll() {
    try {
      const all = await this.collection.find().lean();
      return all;
    } catch (error) {
      throw new Error(err);
    }
  }

  async getById(id) {
    try {
      const one = await this.collection.findById(id).lean();
      return one;
    } catch (error) {
      throw new Error(err);
    }
  }

  async getByUser(data){
    try {
      const one = await this.collection.find({email:data.email}).lean();
      console.log(one[0])
      return one[0];
    } catch (error) {
      throw new Error(err);
    }
  }

  async countAll() {
    try {
      const all = await this.collection.find().count();
      return all;
    } catch (error) {
      throw new Error(err);
    }
  }
  async create(doc) {
    try {
      const one = await this.collection.create(doc);
      return one._id
    } catch (error) {
      throw new Error(error);
    }
  }
  async deleteById(id) {
    try {
      const one = await this.collection.findById(id).deleteOne();
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteAll() {
    try {
      const all = await this.collection.deleteMany();
    } catch (error) {
      throw new Error(err);
    }
  }
  async updateById(id, doc) {
    try {
      const one = await this.collection.findByIdAndUpdate(id, doc);
    } catch (error) {
      throw new Error(err);
    }
  }
}

module.exports = MongoDBClass;