'use strict';

const chai = require('chai')
const expect = chai.expect;
const {
  booksController
} = require('../controllers');

describe('Controllers', () => {
  context('booksController', () => {
    it('Returns an array of Books with author and title', (done) => {
      booksController.list()
        .then(docs => {
          console.log(docs);
          expect(docs).to.be.a('array');
          expect(docs).to.not.be.empty;
          docs.forEach(doc => {
            expect(doc).to.have.keys(['_id', 'title', 'author']);
          });
          done();
        })
        .catch(done);
    });
  });
});
