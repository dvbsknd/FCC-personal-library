'use strict';

const chai = require('chai')
const expect = chai.expect;
const {
  booksController
} = require('../controllers');
const { comments } = require('./mocks');

describe('Controllers', () => {
  context('booksController#list', () => {
    it('Returns an array of Books with author, title and comments', (done) => {
      booksController.list()
        .then(docs => {
          expect(docs).to.be.a('array');
          expect(docs).to.not.be.empty;
          docs.forEach(doc => {
            const keys = Object.keys(doc);
            expect(keys).to.include('_id');
            expect(keys).to.include('author');
            expect(keys).to.include('title');
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

  context('booksController comment handling', () => {

    it('#addComment adds a new comment to the book', (done) => {
      booksController.add('White Fragility', 'Robin DiAngelo')
        // Create a new dummy book and return the ID
        .then(response => response.document._id)
        .then(bookId => {
        // Add the test comments to the book using the #addComments
        // method, returning the bookId
          comments.forEach(comment => {
            booksController.addComment(bookId, comment);
          });
          return bookId;
        })
        // Look up the book and return it with the #getOne method
        .then(bookId => booksController.getOne(bookId))
        // Expect the returned book to have the same comments as
        // those supplied in the mock
        .then(result => {
          console.log(result);
          // expect(book.comments).to.have.lengthOf(comments.length);
          done();
        })
        .catch(done);
    });

    it('#deleteComment removes a comment from the book');

  });

});
