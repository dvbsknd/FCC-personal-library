'use strict';

const Collection = require('../database').Collection;
const books = new Collection('books');

function Book(title, author) {
  if (!title|| !author) throw new Error('Missing title or author');
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
    const book = new Book(title, author);
    return books.get()
      .then(collection => collection.insertOne(book, {}))
      .then(result => ({ success: true, message: 'Book added', book_id: result.insertedId }));
  }
}
