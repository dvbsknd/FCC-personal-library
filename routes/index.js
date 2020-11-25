'use strict';

const express = require('express');
const router = express.Router();
const {
  booksController
} = require('../controllers');

router.use((req, res, next) => {
  res.error = (error) => {
    res.status(400);
    res.json({ error: error.message });
  };
  next();
});

router.use(express.json());

router.route('/books')
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
    booksController.delete(req.body._id)
      .then(result => res.json(result))
      .catch(res.error);
  });

router.route('/comments')
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
router.use((req, res) => {
  res.error({ error: 'Unknown route'});
});

module.exports = router;
