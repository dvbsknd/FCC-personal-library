'use strict';

const { Store, ObjectID } = require('../database');
const books = new Store('books');

function Book (title, author) {
  if (!title || !author) throw new Error('Missing title or author');
  else {
    this.title = title;
    this.author = author;
  }
}

function Comment (author, text, createdAt) {
  if (!text || !author) throw new Error('Missing text or author');
  else {
    this._id = new ObjectID();
    this.author = author;
    this.text = text;
    this.createdAt = createdAt ? new Date(createdAt) : new Date();
  }
}

module.exports.booksController = {

  list: function () {
    // Return a list of all the books in the database
    return books.getAll()
      .then(books => books)
      .catch(err => { throw new Error('Database error:', err) });
  },

  getOne: function (_id) {
    // Return a specific book by its _id
    return books.getOne(_id)
      .then(book => book)
      .catch(err => { throw new Error('Database error:', err) });
  },

  add: function (title, author) {
    // Add a book to the database
    try {
      const book = new Book(title, author);
      return books.addOne(book)
        .then(_id => _id)
        .catch(err => { throw new Error('Database error:', err) });
    } catch (e) {
      return Promise.reject(e);
    }
  },

  delete: function (_id) {
    return books.deleteOne({ _id })
      .then(() => _id)
      .catch(err => { throw new Error('Database error:', err) });
  },

  addComment: function (bookId, comment) {
    const { author, text, createdAt } = comment;
    try {
      const comment = new Comment(author, text, createdAt);
      return books.getOne(bookId)
        .then(book => book._id)
        .then(_id => books.addComment(_id, comment))
        .then(_id => _id)
        .catch(err => { throw new Error('Database error:', err) });
    } catch (e) {
      return Promise.reject(e);
    }
  },

  deleteComment: function (commentId) {
      return books.deleteComment(commentId)
      .then(() => commentId)
      .catch(err => { throw new Error('Database error:', err) });
  },

}
