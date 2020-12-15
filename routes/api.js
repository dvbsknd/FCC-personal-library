'use strict';

const express = require('express');
const api = express.Router();
const {
  booksController
} = require('../controllers');

api.use((req, res, next) => {
  res.error = (err) => {
    console.log('API Error |', err);
    res.status(200);
    res.json(err.message);
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
    if (!title) {
      res.error({ message: 'missing required field title' });
    } else {
      booksController.add(title, author)
        .then(_id => booksController.getOne(_id))
        .then(book => res.json(book))
        .catch(res.error);
    }
  })
  .delete((req, res) => {
    booksController.purge()
      .then(() => res.json('complete delete successful'))
      .catch(res.error);
  });

api.route('/books/:_id')
  .get((req, res) => {
    booksController.getOne(req.params._id)
      .then(book => {
        if (!book.comments) book.comments = [];
        res.json(book);
      })
      .catch(() => res.error({ message: 'no book exists' }));
  })
  .delete((req, res) => {
    booksController.delete(req.params._id)
      .then(() => res.json('delete successful'))
      .catch(() => res.error({ message: 'no book exists' }));
  })
  .post((req, res) => {
    const { _id } = req.params;
    const comment = req.body;
    if (!comment.comment) {
      res.error({ message: 'missing required field comment' })
    } else {
      if (!comment.author) comment.author = 'anonymous';
      booksController.getOne(_id)
        .then((book) => {
          return booksController.addComment(book._id, comment)
            .then(() => booksController.getOne(_id))
            .then(book => {
              res.json({
                ...book,
                comments: book.comments.map((obj) => obj.comment)
              })
            })
        })
        .catch((err) => {
          if (err.message.includes('failed to retreive book'))
            res.error({ message: 'no book exists'});
          else res.error(err);
        });
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
