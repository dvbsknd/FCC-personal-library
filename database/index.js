'use strict';

const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const dbName = process.env.NODE_ENV === 'test' ? process.env.MONGO_DATABASE_TEST : process.env.MONGO_DATABASE;
const assert = require('assert');

function Collection (collection) {
  this.collection = collection;
  this.ObjectID = ObjectID;
}

Collection.prototype.get = function () {
  return new Promise((resolve, reject) => {
    MongoClient.connect(process.env.MONGO_URI, { useUnifiedTopology: true })
      .then(client => {
        resolve(client.db(dbName).collection(this.collection));
      })
      .catch(err => {
        reject(err);
      });
  });
};

module.exports = {
  Collection,
  ObjectID
};
