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
    return books.getAll();
  },

  getOne: function (_id) {
    // Return a specific book by its _id
    return books.getOne(_id);
  },

  add: function (title, author) {
    // Add a book to the database
    try {
      const book = new Book(title, author);
      return books.addOne(book)
        .then(document => ({ success: true, message: 'Book added', book: document }));
    } catch (e) {
      return Promise.reject(e);
    }
  },

  delete: function (_id) {
    try {
      return books.getOne()
        .then(collection => collection.deleteOne({ _id: ObjectID(_id) }))
        .then(result => {
          // TODO: Move this error checking to the database
          const { ok, n } = result.toJSON();
          if (ok === 1 && n === 1) {
            return { success: true, message: 'Book deleted', _id };
          }
          else throw new Error('Could not delete book');
        });
    } catch (e) {
      return Promise.reject(e);
    }
  },

  addComment: function (bookId, comment) {
    const { author, text, createdAt } = comment;
    try {
      const comment = new Comment(author, text, createdAt);
      return books.getOne(bookId)
        .then(book => book._id)
        .then(_id => books.addComment(_id, comment))
        .then(()=> ({ success: true, message: 'Comment added', comment }));
    } catch (e) {
      return Promise.reject(e);
    }
  },

  deleteComment: function (commentId) {
    try {
      return books.getOne()
        .then(collection => collection.findOneAndUpdate(
          { "comments._id": ObjectID(commentId) },
          { $pull: { comments: { _id: ObjectID(commentId) } } }
        ))
        .then((response)=> {
          console.log(response);
          return { success: true, message: 'Comment deleted', commentId: commentId  }
        });
    } catch (e) {
      return Promise.reject(e);
    }
  },

}
