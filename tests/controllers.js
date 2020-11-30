'use strict';

const chai = require('chai')
const expect = chai.expect;
const {
  booksController
} = require('../controllers');
const { books, comments } = require('./mocks');

describe('Controllers', () => {

  beforeEach('Add a test book to the database', () => {
    // Create a new dummy book and store the ID
    const idx = Math.floor(Math.random() * books.length)
    const { author, title } = books[idx];
    booksController.add(author, title)
  });

  context('booksController#list', () => {
    it('Returns an array of Books with author and title', (done) => {
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

  context('booksController#getOne', () => {
    it('Returns an Book with author, title and comments', (done) => {
      // Get a bookId to work with
      booksController.list()
        .then(books => {
          const idx = Math.floor(Math.random() * books.length)
          return books[idx]._id
        })
        .then(_id => {
          booksController.getOne(_id)
            .then(doc => {
              const keys = Object.keys(doc);
              expect(keys).to.include('_id');
              expect(keys).to.include('author');
              expect(keys).to.include('title');
              done();
            })
        })
        .catch(done);
    });
  });

  context('booksController#purge', () => {
    it('Deletes all books from the database', (done) => {
      // Get a bookId to work with
      booksController.purge()
        .then(res => {
          console.log(res);
          return res;
        })
        .then(() => booksController.list())
        .then(books => expect(books).to.have.length(0))
        .then(() => done())
        .catch(done);
    });
  });

  context('booksController comment handling', () => {

    it('#addComment adds a new comment to the book', (done) => {
      // Get a bookId to work with
      booksController.list()
        .then(books => {
          const idx = Math.floor(Math.random() * books.length)
          return books[idx]._id;
        })
        // Add a test comment to the book using the #addComments
        // method
        .then(_id => {
          // Choose a random comment
          const idx = Math.floor(Math.random() * comments.length)
          // Add it to the selected book
          booksController.addComment(_id, comments[idx])
            // Look up the book and return it with the #getOne method
            .then(() => booksController.getOne(_id))
            // Expect the returned book to have the same comments as
            // those supplied in the mock
            .then(book=> {
              expect(Object.keys(book)).to.include('comments');
              const comment = book.comments[0];
              const { author, title, createdAt } = comments[idx];
              expect(comment.author).to.equal(author);
              expect(comment.title).to.equal(title);
              expect(comment.createdAt.getTime()).to.equal(createdAt.getTime());
              done();
            })
            .catch(done);
        })
    });

    it('#deleteComment removes a comment from the book');

  });

});
