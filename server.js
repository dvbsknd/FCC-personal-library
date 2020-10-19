'use strict';

const express = require('express');
const app = express();
const port = process.env.NODE_ENV === 'test' ? process.env.PORT_TEST : process.env.PORT;
const helmet = require('helmet');
const router = require('./routes');

// Common middleware
app.use(helmet.contentSecurityPolicy({
  directives: { 
    scriptSrc: ['unsafe-eval'],
    imageSrc: ["'self'", "data:"],
    defaultSrc: ["'self'"]
  }
}));
app.use(express.urlencoded({ extended: true }));

// Static assets
app.use(express.static('public/build'));

// Client and API Routers
// app.use('/', router);

const listener = app.listen(port || 3000, () => {
  console.log("Listening on port", listener.address().port);
});

module.exports = app; // Export for testing
