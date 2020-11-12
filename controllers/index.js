'use strict';

const { Collection, ObjectID } = require('../database');
const books = new Collection('books');

function Book(title, author) {
  if (!title || !author) throw new Error('Missing title or author');
  else {
    this.title = title;
    this.author = author;
  }
}

module.exports.booksController = {
  list: function () {
    return books.get().then(collection => collection.find().toArray())
  },
  add: function (title, author) {
    try {
      const book = new Book(title, author);
      return books.get()
        .then(collection => collection.insertOne(book, {}))
        .then(result => ({ success: true, message: 'Book added', document: result.ops[0] }));
    } catch (e) {
      return Promise.reject(e);
    };
  },
  delete: function (_id) {
    try {
      return books.get()
        .then(collection => collection.deleteOne({ _id: ObjectID(_id) }))
        .then(result => {
          const { ok, n } = result.toJSON();
          if (ok === 1 && n === 1) {
            return { success: true, message: 'Book deleted', _id };
          }
          else throw new Error('Could not delete book');
        });
    } catch (e) {
      return Promise.reject(e);
    }
  }
}
