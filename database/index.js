'use strict';

const { MongoClient } = require('mongodb');
const { ObjectID } = require('mongodb');
const dbName = process.env.NODE_ENV === 'test' ? process.env.MONGO_DATABASE_TEST : process.env.MONGO_DATABASE;

function Store (collection) {
  this.collection = collection;
  this.ObjectID = ObjectID;
}

Store.prototype.execQuery = function (query, filter, data) {
  // Create the connection
  return MongoClient.connect(process.env.MONGO_URI, { useUnifiedTopology: true })
    .then(client => {
      const collection = client.db(dbName).collection(this.collection);
      switch (query) {
        case 'getAll':
          return collection.find().toArray()
            .then(result => {
              client.close();
              return result;
            });
        case 'getOne':
          return collection.findOne({ _id: ObjectID(filter) })
            .then(result => {
              client.close();
              return result;
            });
        case 'addOne':
          return collection.insertOne(data)
            .then(result => {
              client.close();
              return result.ops[0];
            });
        case 'deleteOne':
          return collection.findOneAndDelete({ _id: ObjectID(filter) })
            .then(result => {
              client.close();
              return result;
            });
        case 'addComment':
          return collection.updateOne({ _id: ObjectID(filter) }, { $push: { comments: data } })
            .then(result => {
              client.close();
              return result;
            });




        default: throw new Error('Query failed');
      }
    });
}

Store.prototype.getAll = function () {
  return this.execQuery('getAll')
    .then(res => res)
    .catch(err => err);
};

Store.prototype.getOne = function (_id) {
  return this.execQuery('getOne', _id)
    .then(res => res)
    .catch(err => err);
};

Store.prototype.addOne = function (document) {
  return this.execQuery('addOne', null,  document)
    .then(res => res)
    .catch(err => err);
};

Store.prototype.deleteOne = function (_id) {
  return this.execQuery('deleteOne', _id)
    .then(res => res)
    .catch(err => err);
};

Store.prototype.addComment = function (bookId, comment) {
  return this.execQuery('addComment', bookId, comment)
      .then(res => {
          return res.result.ok === 1 || new Error('Unable to save comment');
        })
    .catch(err => err);
};

module.exports = {
  Store,
  ObjectID
};
