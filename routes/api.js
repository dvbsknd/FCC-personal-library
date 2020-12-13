'use strict';

const express = require('express');
const api = express.Router();
const {
  booksController
} = require('../controllers');

api.use((req, res, next) => {
  res.error = (error) => {
    res.status(400);
    res.json(error.message);
  };
  next();
});

api.use(express.json());

// Test mode debugging
api.use((req, res, next) => {
  if (process.env.NODE_ENV !== 'production') {
    const { method, url, body } = req;
    console.log('Request | %s %s %o', method, url, body);
  }
  next();
});

api.route('/books')
  .get((req, res) => {
    booksController.list()
      .then(result => res.json(result))
      .catch(res.error);
  })
  .post((req, res) => {
    const { title, author } = req.body;
    if (!title) res.error({ message: 'missing required field title' });
    booksController.add(title, author)
      .then(_id => booksController.getOne(_id))
      .then(book => res.json(book))
      .catch(res.error);
  })
  .delete((req, res) => {
    booksController.purge()
      .then(() => res.json('complete delete successful'))
      .catch(res.error);
  });

api.route('/books/:_id')
  .get((req, res) => {
    booksController.getOne(req.params._id)
      .then(book => res.json(book))
      .catch(() => res.error({ message: 'no book exists' }));
  })
  .delete((req, res) => {
    booksController.delete(req.params._id)
      .then(() => res.json('delete successful'))
      .catch(res.error);
  })
  .post((req, res) => {
    const { _id } = req.params;
    const { comment } = req.body;
    if (!comment) {
      res.error({ message: 'missing required field comment' })
    } else {
     return booksController.addComment(_id, comment)
      .then(() => booksController.getOne(_id))
      .then(book => res.json(book))
      .catch(res.error);
    }
  })

api.route('/comments')
  .delete((req, res) => {
    booksController.deleteComment(req.body._id)
      .then(() => res.json('delete successful'))
      .catch(res.error);
  });

// Unmatched routes
api.use((req, res) => {
  res.error({ error: 'Unknown route'});
});

module.exports = api;
