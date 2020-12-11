'use strict';

const { MongoClient } = require('mongodb');
const { ObjectID } = require('mongodb');
const dbName = process.env.NODE_ENV === 'test'
  ? process.env.MONGO_DATABASE_TEST
  : process.env.MONGO_DATABASE;

function Store (collection) {
  this.ObjectID = ObjectID;
  this.connect = () => MongoClient.connect(process.env.MONGO_URI,
    { useUnifiedTopology: true, }
  )
    .then(client => {
      this.client = client;
      return client.db(dbName).collection(collection);
    });
}

Store.prototype.getAll = function () {
  return this.connect()
    .then(collection => {
      return collection.aggregate([
        { $addFields: { commentCount: { $cond: {
          if: { $isArray: '$comments' },
          then: { $size: '$comments' },
          else: 0 } } } }
      ]).toArray()
    })
    .then(result => {
      this.client.close();
      if (result) return result;
      else throw new Error('#find failed');
    });
};

Store.prototype.getOne = function (docId) {
  return this.connect()
    .then(collection => collection.findOne({ _id: ObjectID(docId) }))
    .then(result => {
      this.client.close();
      if (result) return result;
      else throw new Error('#findOne failed');
    });
};

Store.prototype.addOne = function (document) {
  return this.connect()
    .then(collection => collection.insertOne(document))
    .then(result => {
      this.client.close();
      if (result.result.ok === 1) return document._id;
      else throw new Error('#addOne failed');
    });
};

Store.prototype.deleteOne = function (docId) {
  return this.connect()
    .then(collection => collection.findOneAndDelete({ _id: ObjectID(docId) }))
    .then(result => {
      this.client.close();
      if (result.ok === 1) return result.value._id;
      else throw new Error('#deleteOne failed');
    });
};

Store.prototype.deleteAll = function () {
  return this.connect()
    .then(collection => collection.deleteMany({}))
    .then(result => {
      this.client.close();
      if (result.result.ok === 1) return result.deletedCount;
      else throw new Error('#deleteAll failed');
    });
};

Store.prototype.addSubDoc = function (docId, key, subDoc) {
  const data = {};
  data[key] = subDoc;
  return this.connect()
    .then(collection => collection.updateOne(
      { _id: ObjectID(docId) },
      { $push: data }
    ))
    .then(result => {
      this.client.close();
      if (result.result.nModified === 1) return data;
      else throw new Error('#addSubDoc failed');
    });
};

Store.prototype.deleteSubDoc = function (key, subDocId) {
  return this.connect()
    .then(collection => collection.updateOne(
      { [`${key}._id`]: ObjectID(subDocId) },
      { $pull: { [key]: { _id: ObjectID(subDocId) } } }
    ))
    .then(result => {
      this.client.close();
      if (result.result.nModified === 1) return subDocId;
      else throw new Error('#deleteSubDoc failed');
    });
};

module.exports = {
  Store,
  ObjectID
};
