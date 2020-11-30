'use strict';

const express = require('express');
const monitor = express.Router();

// Handles fCC's request for test results
monitor.route('/get-tests')
  .get((req, res) => {
    res.send('Once completed, \
      this will send the result of running the test suite');
  });

module.exports = monitor;
