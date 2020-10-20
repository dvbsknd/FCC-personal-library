'use strict';

const express = require('express');
const router = express.Router();
const {
  booksController
} = require('../controllers');

router.use((req, res, next) => {
  res.error = (error) => {
    console.log('[API Error]', error);
    res.status(500);
    res.json({ error: error.message });
  };
  next();
});

router.route('/books')
  .get((req, res, next) => {
    booksController.list().then(res.json).catch(res.error);
  });

// Unmatched routes
router.use((req, res) => {
  res.json({ error: 'Unknown route'});
});

module.exports = router;
