'use strict';

const books = [
  { id: 1, name: 'The Old Man and the Sea', author: 'Ernest Hemingway' },
  { id: 2, name: 'Guns, Germs and Steel', author: 'Jared Diamond' },
  { id: 3, name: 'Basic Economics', author: 'Thomas Sowell' },
];
const err = new Error('No books are there');

const booksController = { 
  list: function () {
    return new Promise((resolve, reject) => {
      if (true) {
        reject(err);
      }
      else resolve(books);
    });
  }
}

module.exports = {
  booksController
};
