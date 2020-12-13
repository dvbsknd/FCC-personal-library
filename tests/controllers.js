'use strict';

const chai = require('chai')
const expect = chai.expect;
const {
  booksController
} = require('../controllers');
const { books: mockBooks, comments: mockComments } = require('./mocks');
const { ObjectID } = require('../database');

describe('Controllers', () => {

  let testBook, testBookId;
  beforeEach('Add a test book to the database', done => {
    const idx = Math.floor(Math.random() * mockBooks.length)
    testBook = mockBooks[idx];
    const { author, title } = testBook;
    booksController.add(title, author)
      .then(_id => {
        testBookId = _id;
        done()
      })
      .catch(done);
  });

  context('booksController#list', () => {
    it('Returns an array of Books with author, title and number of comments',
      (done) => {
        booksController.list()
          .then(docs => {
            expect(docs).to.be.a('array');
            expect(docs).to.not.be.empty;
            docs.forEach(doc => {
              const keys = Object.keys(doc);
              expect(keys).to.include('_id');
              expect(keys).to.include('author');
              expect(keys).to.include('title');
              expect(keys).to.include('commentcount');
              expect(doc.commentcount).to.be.a('number');
            });
            done();
          })
          .catch(done);
    });
  });

  context('booksController#add', () => {
    it('If successful, returns the ID of the newly added book', () => {
      expect(testBookId).to.be.an.instanceOf(ObjectID);
    });

    it('Will allow a book to be added with only a title, no author', done => {
      const idx = Math.floor(Math.random() * mockBooks.length)
      const book = mockBooks[idx];
      const { title } = book;
      booksController.add(title)
        .then(_id=> {
          expect(_id).to.be.an.instanceOf(ObjectID);
          done()
        })
        .catch(done);
    });

  });

  context('booksController#getOne', () => {
    it('Returns an Book with author, title and comments', (done) => {
      booksController.list()
        .then(books => {
          const idx = Math.floor(Math.random() * books.length)
          return books[idx]._id
        })
        .then(_id => booksController.getOne(_id))
        .then(doc => {
          const keys = Object.keys(doc);
          expect(keys).to.include('_id');
          expect(keys).to.include('author');
          expect(keys).to.include('title');
          done();
        })
        .catch(done);
    });
  });

  context('booksController#deleteOne', () => {
    it('Throws an error if no _id is supplied');
    it('Returns a confirmation message with the Book ID');
    it('Physically removes the book from the database');
   });

  context('booksController#purge', () => {
    it('Deletes all books from the database', (done) => {
      booksController.purge()
        .then(() => booksController.list())
        .then(books => {
          expect(books).to.have.length(0);
          done();
        })
        .catch(done);
    });
  });

  context('booksController comment handling', () => {

    let commentToAdd, addedComment;
    before('Get a mock comment to work with', () => {
      const idx = Math.floor(Math.random() * mockComments.length)
      commentToAdd = mockComments[idx];
    });

    it('#addComment adds a new comment to the book', (done) => {
      booksController.addComment(testBookId, commentToAdd)
        .then(() => booksController.getOne(testBookId))
        .then(book => {
          expect(Object.keys(book)).to.include('comments');
          addedComment = book.comments[0];
          const { author, title, createdAt } = commentToAdd;
          expect(addedComment._id).to.be.an.instanceOf(ObjectID);
          expect(addedComment.author).to.equal(author);
          expect(addedComment.title).to.equal(title);
          expect(addedComment.createdAt.getTime()).to.equal(createdAt.getTime());
          done();
        })
        .catch(done);
    });

    it('#deleteComment removes a comment from the book', (done) => {
      booksController.deleteComment(addedComment._id)
        .then(deletedId => {
          expect(deletedId).to.equal(addedComment._id);
        })
        .then(() => booksController.getOne(testBookId))
        .then(returnedBook => {
          if (returnedBook.comments) {
            const { comments } = returnedBook;
            const deletedComment = comments.find(item => item._id = commentToAdd._id);
            expect(deletedComment).to.be.null;
          } else {
            expect(returnedBook.coments).to.be.undefined;
          }
          done();
        })
        .catch(done);
    });

  });
});
