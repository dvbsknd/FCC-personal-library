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
      .then(result => res.json(result))
      .catch(res.error);
  })
  .delete((req, res) => {
    booksController.purge()
      .then(result => res.json(result))
      .catch(res.error);
  });

api.route('/books/:_id/')
  .delete((req, res) => {
    booksController.delete(req.params._id)
      .then(result => res.json(result))
      .catch(res.error);
  });

api.route('/comments')
  .post((req, res) => {
    booksController.addComment(req.body.bookId, req.body.comment)
      .then(result => res.json(result))
      .catch(res.error);
  })
  .delete((req, res) => {
    booksController.deleteComment(req.body._id)
      .then(result => res.json(result))
      .catch(res.error);
  });

// Unmatched routes
api.use((req, res) => {
  res.error({ error: 'Unknown route'});
});

module.exports = api;
