'use strict';

const Collection = require('../database').Collection;
const books = new Collection('books');

module.exports.booksController = {
  list: function () {
      return books.get().then(collection => collection.find().toArray())
  }
}
