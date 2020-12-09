'use strict';

const express = require('express');
const monitor = express.Router();
const Mocha = require('mocha');
const fs = require('fs');
const path = require('path');

// Handles fCC's request for test results
monitor.route('/get-tests')
  .get((req, res) => {
    // Instantiate a Mocha instance.
    var mocha = new Mocha({ reporter: 'spec' });
    var testDir = './tests';
    // Add each .js file to the mocha instance
    const testFiles = fs.readdirSync(testDir)
      .filter(file => file.match(/api|controllers|server/));
    testFiles.forEach(file => {
      mocha.addFile(path.join(testDir, file));
    });
    const results = [];
    const runner = mocha.run()
    runner.on('test end', (e) => results.push({
      group: e.parent.title,
      title: e.title,
      state: e.state,
      assertions: ['Yes']
    }));
    runner.on('end', () => res.json(results));
  });

// Unmatched routes
monitor.use((req, res) => {
  res.error({ error: 'Unknown route'});
});

module.exports = monitor;
