'use strict';

const chai = require('chai')
const expect = chai.expect;
const {
  booksController
} = require('../controllers');
const { books, comments } = require('./mocks');

describe('Controllers', () => {

  let idx, author, title;

  beforeEach('Choose a test book to add to the database', () => {
    // Create a new dummy book and store the ID
    idx = Math.floor(Math.random() * books.length)
    title = books[idx].title;
    author = books[idx].author;
  });

  context('booksController#add', () => {
    it('Returns a success message and the ID of the newly added book', (done) => {
      booksController.add(author, title)
        .then(response => {
          expect(response).to.have.keys(['success', 'message','document']);
          expect(response.success).to.be.equal(true);
          expect(response.document._id.toString()).to.have.lengthOf(24);
          done();
        })
        .catch(done);
    });
  });

  context('booksController#list', () => {
    it('Returns an array of Books with author and title', (done) => {
      booksController.add(author, title)
        .then(() => booksController.list())
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

  context('booksController#getOne', () => {
    it('Returns an Book with author, title and comments', (done) => {
      booksController.add(author, title)
        .then(() => booksController.list())
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

  context('booksController#purge', () => {
    it('Deletes all books from the database', (done) => {
      booksController.add(author, title)
        .then(() => booksController.purge())
        .then(() => booksController.list())
        .then(books => expect(books).to.have.length(0))
        .then(() => done())
        .catch(done);
    });
  });

  context('booksController comment handling', () => {

    it('#addComment adds a new comment to the book', (done) => {
      // Get a bookId to work with
      let bookId, commentId;
      booksController.add(author, title)
        .then(() => booksController.list())
        .then(books => {
          const idx = Math.floor(Math.random() * books.length)
          return books[idx]._id;
        })
      // Add a test comment to the book using the #addComments
      // method
        .then(_id => {
          // Choose a random comment
          bookId = _id;
          const idx = Math.floor(Math.random() * comments.length)
          // Add it to the selected book
          return booksController.addComment(_id, comments[idx])
        })
        .then(res => {
          commentId = res.comment._id;
        })
      // Look up the book and return it with the #getOne method
        .then(() => booksController.getOne(bookId))
      // Expect the returned book to have the same comments as
      // those supplied in the mock
        .then(book=> {
          expect(Object.keys(book)).to.include('comments');
          const comment = book.comments.find(comment => {
            return comment._id.toString() === commentId.toString();
          });
          const { author, title, createdAt } = comment;
          expect(author).to.equal(author);
          expect(title).to.equal(title);
          expect(createdAt.getTime()).to.equal(createdAt.getTime());
          done();
        })
        .catch(done);
    });

    it('#deleteComment removes a comment from the book', (done) => {
      let bookId, commentId;
      // Add a book
      booksController.add(author, title)
        .then(() => booksController.list())
      // Get a book _id to work with
        .then(books => {
          const idx = Math.floor(Math.random() * books.length)
          // Save the _id for later
          bookId = books[idx]._id;
          return bookId
        })
      // Add a test comment to the book using the #addComments
      // method
        .then(_id => {
          // Choose a random comment
          const idx = Math.floor(Math.random() * comments.length)
          // Add it to the selected book
          return booksController.addComment(_id, comments[idx])
        })
        .then(res => {
          // Save the generated comment _id for later
          commentId = res.comment._id;
        })
      // Look up the book and return it with the #getOne method
        .then(() => booksController.getOne(bookId))
      // Get the commentId
        .then(book => {
          const comment = book.comments.find(comment => {
            return comment._id.toString() === commentId.toString();
          });
          expect(comment._id.toString()).to.equal(commentId.toString());
        })
        .then(() => booksController.deleteComment(commentId))
        .then(res => {
          // Should tell us which comment has been deleted
          expect(res.commentId).to.equal(commentId);
        })
      // Should not have a comment with that ID when asked
        .then(() => booksController.getOne(bookId))
        .then(book => {
          const comment = book.comments.find(comment => {
            return comment._id.toString() === commentId.toString();
          });
          expect(comment).to.be.undefined;
          done();
        })
        .catch(done);
    });

  });
});
