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
              else throw new Error('#find failed');
            });

        case 'getOne':
          return collection.findOne({ _id: ObjectID(filter) })
            .then(result => {
              client.close();
              if (result) return result;
              else throw new Error('#findOne failed');
            });

        case 'addOne':
          return collection.insertOne(data)
            .then(cmdResult => {
              client.close();
              const { result } = cmdResult;
              if (result.ok === 1) return data._id;
              else throw new Error('#addOne failed');
            });

        case 'deleteOne':
          return collection.findOneAndDelete({ _id: ObjectID(filter) })
            .then(result => {
              client.close();
              if (result.ok === 1) return result.value._id;
              else throw new Error('#deleteOne failed');
            });

        case 'deleteAll':
          return collection.deleteMany({})
            .then(result => {
              client.close();
              if (result.result.ok === 1) return result.deletedCount;
              else throw new Error('#deleteAll failed');
            });

        case 'addSubDoc':
          return collection.updateOne(
            { _id: ObjectID(filter) },
            { $push: data }
          )
            .then(result => {
              client.close();
              if (result.result.nModified !== 1) {
                throw new Error('#addSubDoc failed');
              }
              return data;
            });

        case 'deleteSubDoc':
          return collection.updateOne(
            { [`${filter}._id`]: ObjectID(data) },
            { $pull: { [filter]: { _id: ObjectID(data) } } }
          )
            .then(result => {
              client.close();
              if (result.result.nModified !== 1) {
                throw new Error('#deleteSubDoc failed');
              }
              return data;
            });
        default: throw new Error('Query failed');
      }
    }).catch(err => {
      console.log('[Database Error]', err);
      throw err;
    })
}

Store.prototype.getAll = function () {
  return this.execQuery('getAll')
};

Store.prototype.getOne = function (docId) {
  return this.execQuery('getOne', docId)
};

Store.prototype.addOne = function (document) {
  return this.execQuery('addOne', null,  document)
};

Store.prototype.deleteOne = function (docId) {
  const docObjId = ObjectID(docId);
  return this.execQuery('deleteOne', docObjId)
};

Store.prototype.deleteAll = function () {
  return this.execQuery('deleteAll')
};

Store.prototype.addSubDoc = function (docId, key, subDoc) {
  const data = {};
  data[key] = subDoc;
  return this.execQuery('addSubDoc', docId, data)
};

Store.prototype.deleteSubDoc = function (key, subDocId) {
  return this.execQuery('deleteSubDoc', key, subDocId)
};

module.exports = {
  Store,
  ObjectID
};
