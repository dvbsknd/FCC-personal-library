'use strict';

const express = require('express');
const api = express.Router();
const {
  booksController
} = require('../controllers');

api.use((req, res, next) => {
  res.error = (error) => {
    res.status(400);
    res.json({ error: error.message });
  };
  next();
});

api.use(express.json());

api.route('/books')
  .get((req, res) => {
    booksController.list()
      .then(result => res.json(result))
      .catch(res.error);
  })
  .post((req, res) => {
    booksController.add(req.body.title, req.body.author)
      .then(_id => booksController.getOne(_id))
      .then(book => res.json(book))
      .catch(res.error);
  })
  .delete((req, res) => {
    booksController.purge()
      .then(count => res.json({ success: true, message: 'All books deleted', count }))
      .catch(res.error);
  });

api.route('/books/:_id')
  .delete((req, res) => {
    booksController.delete(req.params._id)
      .then(_id => res.json({ success: true, message: 'Book deleted', _id }))
      .catch(res.error);
  });

api.route('/comments')
  .post((req, res) => {
    booksController.addComment(req.body.bookId, req.body.comment)
      .then(_id => booksController.getComment(req.body.bookId, _id))
      .then(comment => res.json({ success: true, message: 'Comment added', comment }))
      .catch(res.error);
  })
  .delete((req, res) => {
    booksController.deleteComment(req.body._id)
      .then(_id => res.json({ success: true, message: 'Comment deleted', _id }))
      .catch(res.error);
  });

// Unmatched routes
api.use((req, res) => {
  res.error({ error: 'Unknown route'});
});

module.exports = api;
