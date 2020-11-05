'use strict';

const chai = require('chai')
const expect = chai.expect;
const {
  booksController
} = require('../controllers');

describe('Controllers', () => {
  context('booksController#list', () => {
    it('Returns an array of Books with author and title', (done) => {
      booksController.list()
        .then(docs => {
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
  context('booksController#add', () => {
    it('Returns a success message and the ID of the newly added book', (done) => {
      booksController.add('White Fragility', 'Robin DiAngelo')
        .then(response => {
          expect(response).to.have.keys(['success', 'message','document']);
          expect(response.success).to.be.equal(true);
          expect(response.document._id.toString()).to.have.lengthOf(24);
          done();
        })
        .catch(done);
    });
  });
});
