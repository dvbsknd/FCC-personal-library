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
              if (result) return result;
              else throw new Error('Unable to retrieve books');
            });
        case 'getOne':
          return collection.findOne({ _id: ObjectID(filter) })
            .then(result => {
              client.close();
              if (result) return result;
              else throw new Error('Unable to retrieve book');
            });
        case 'addOne':
          return collection.insertOne(data)
            .then(cmdResult => {
              client.close();
              const { result } = cmdResult;
              if (result.ok === 1) return data._id;
              else throw new Error('Unable to save book');
            });
        case 'deleteOne':
          return collection.findOneAndDelete({ _id: ObjectID(filter) })
            .then(result => {
              client.close();
              if (result.result.ok === 1) return filter;
              else throw new Error('Unable to delete book');
            });
        case 'addComment':
          return collection.updateOne(
            { _id: ObjectID(filter) },
            { $push: { comments: data } }
          )
            .then(result => {
              client.close();
              if (result.result.ok === 1) return data._id;
              else throw new Error('Unable to save comment');
            });
        case 'deleteComment':
          return collection.findOneAndUpdate(
            { "comments._id": ObjectID(filter) },
            { $pull: { comments: { _id: ObjectID(filter) } } }
          )
            .then(result => {
              client.close();
              console.log(result);
              if (result.result.ok === 1) return filter;
              else throw new Error('Unable to delete comment');
            });
        default: throw new Error('Query failed');
      }
    });
}

Store.prototype.getAll = function () {
  return this.execQuery('getAll')
};

Store.prototype.getOne = function (_id) {
  return this.execQuery('getOne', _id)
};

Store.prototype.addOne = function (document) {
  return this.execQuery('addOne', null,  document)
};

Store.prototype.deleteOne = function (_id) {
  return this.execQuery('deleteOne', _id)
};

Store.prototype.addComment = function (bookId, comment) {
  return this.execQuery('addComment', bookId, comment)
};

Store.prototype.deleteComment = function (commentId) {
  return this.execQuery('deleteComment', commentId)
};

module.exports = {
  Store,
  ObjectID
};
