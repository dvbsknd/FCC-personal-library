'use strict';

const express = require('express');
const router = express.Router();
const {
  booksController
} = require('../controllers');

router.route('/books')
  .get((req, res, next) => {
    booksController.list().then(res.json).catch(next);
  });

// Unmatched routes
router.use((req, res) => {
  res.json({ error: 'Unknown route'});
});

module.exports = router;
