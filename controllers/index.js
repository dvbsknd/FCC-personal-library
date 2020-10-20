'use strict';

const Collection = require('../database').Collection;
const books = new Collection('books');

module.exports.booksController = {
  list: function () {
    return new Promise((resolve, reject) => {
      books.get()
        .then(collection => {
          collection.find().toArray().then(resolve);
        })
        .catch(reject);
    });
  }
}
