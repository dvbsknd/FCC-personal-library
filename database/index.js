'use strict';

const { MongoClient } = require('mongodb');
const { ObjectID } = require('mongodb');
const dbName = process.env.NODE_ENV === 'test' ? process.env.MONGO_DATABASE_TEST : process.env.MONGO_DATABASE;

function Store (collection) {
  this.collection = collection;
  this.ObjectID = ObjectID;
}

Store.prototype.getAll = function () {
  return new Promise((resolve, reject) => {
    MongoClient.connect(process.env.MONGO_URI, { useUnifiedTopology: true })
      .then(client => {
        return {
          client,
          data: client.db(dbName).collection(this.collection).find().toArray()
        }
      })
      .then(res => {
        res.data.then(result => {
          res.client.close();
          resolve(result)
        })
      })
      .catch(err => reject(err));
  })
};

Store.prototype.getOne = function (_id) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(process.env.MONGO_URI, { useUnifiedTopology: true })
      .then(client => {
        return {
          client,
          data: client.db(dbName).collection(this.collection).findOne({ _id: ObjectID(_id) })
        }
      })
      .then(res => {
        res.data.then(result => {
          res.client.close();
          resolve(result)
        })
      })
      .catch(err => reject(err));
  })
};

Store.prototype.addOne = function (document) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(process.env.MONGO_URI, { useUnifiedTopology: true })
      .then(client => {
        return {
          client,
          data: client.db(dbName).collection(this.collection).insertOne(document)
        }
      })
      .then(res => {
        res.data.then(result => {
          res.client.close();
          resolve(result)
        })
      })
      .catch(err => reject(err));
  })
};
module.exports = {
  Store,
  ObjectID
};
