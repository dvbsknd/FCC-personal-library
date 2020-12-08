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

function handleError (err) {
  throw new Error(`Database error: ${err.message}`);
}

module.exports.booksController = {

  add: function (title, author) {
    try {
      const book = new Book(title, author);
      return books.addOne(book).catch(handleError);
    } catch (e) {
      return Promise.reject(e);
    }
  },

  list: function () {
    return books.getAll().catch(handleError);
  },

  getOne: function (_id) {
    return books.getOne(_id).catch(handleError);
  },

  delete: function (_id) {
    return _id
      ? books.deleteOne(_id).catch(handleError)
      : Promise.reject(new Error('Valid _id not supplied'));
  },

  addComment: function (bookId, comment) {
    const { author, text, createdAt } = comment;
    try {
      const comment = new Comment(author, text, createdAt);
      return books.addSubDoc(bookId, 'comments', comment)
        .then(() => comment._id)
        .catch(handleError);
    } catch (e) {
      return Promise.reject(e);
    }
  },

  deleteComment: function (commentId) {
    return books.deleteSubDoc('comments', commentId)
      .then(() => commentId)
      .catch(handleError);
  },

}
