'use strict';

const { Store, ObjectID } = require('../database');
const books = new Store('books');

function Book (title, author) {
  if (!author) throw new Error('missing required field author');
  if (!title) throw new Error('missing required field title');
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

  purge: function() {
    return books.deleteAll().catch(handleError);
  },

  delete: function (_id) {
    return ObjectID.isValid(_id)
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

  getComment: function (bookId, commentId) {
      return books.getOne(bookId)
      .then(book => {
        const comment = book.comments.find(comment => {
          return comment._id.toString() === commentId.toString();
        })
        return comment;
      })
        .catch(handleError);
  },

  deleteComment: function (commentId) {
    return books.deleteSubDoc('comments', commentId)
      .then(() => commentId)
      .catch(handleError);
  },

}
