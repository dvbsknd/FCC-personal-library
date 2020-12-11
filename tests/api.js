'use strict';

const chai = require('chai')
const chaiHttp = require('chai-http');
const app = require('express')();
const { api } = require('../routes');
const expect = chai.expect;
const { books } = require('./mocks');
const ObjectID = require('bson-objectid');


app.use('/api', api);
chai.use(chaiHttp);

describe('API', () => {
  context('POST request for /books', () => {

    let testBook;
    let result;
    before(done => {

      const idx = Math.floor(Math.random() * books.length)
      testBook = books[idx];
      const { author, title } = testBook;

      chai.request(app)
        .post('/api/books')
        .set('Content-Type', 'application/json; charset=utf-8')
        .send({ author, title })
        .end((err, res) => {
          if (err) done(err);
          else {
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.body).to.not.be.empty;
            result = res;
            done();
          }
        })
    });

    it('Returns the body of the newly added book', (done) => {
      expect(result.body).to.have.keys(['_id', 'author', 'title']);
      done();
    });

  });

  context('GET request for /books', () => {
    let result;

    before(done => {
      chai.request(app)
        .get('/api/books')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.not.be.empty;
          result = res;
          done();
        })
    });

    it('Returns an array of Books with author and title', (done) => {
      result.body.forEach(book => {
        const keys = Object.keys(book);
        expect(keys).to.include('_id');
        expect(keys).to.include('author');
        expect(keys).to.include('title');
      });
      done();
    });
  });

  context('GET request for a single book at /books/:id', () => {
    let testBook;
    let result;

    before(done => {
      const idx = Math.floor(Math.random() * books.length)
      testBook = books[idx];
      const { author, title } = testBook;

      chai.request(app)
        .post('/api/books')
        .set('Content-Type', 'application/json; charset=utf-8')
        .send({ author, title })
        .then((res) => {
          const { _id } = res.body;
          chai.request(app)
            .get(`/api/books/${_id}`)
            .end((err, res) => {
              expect(err).to.be.null;
              expect(res).to.have.status(200);
              expect(res).to.be.json;
              expect(res.body).to.not.be.empty;
              result = res;
              done();
            })
        })
    });

    it('Returns a single Book with an id, author and title', (done) => {
      const keys = Object.keys(result.body);
      expect(keys).to.include('_id');
      expect(keys).to.include('author');
      expect(keys).to.include('title');
      done();
    });
  });

  context('GET request for an invalid single book at /books/:id', () => {
    let result;

    before(done => {
      chai.request(app)
        .get(`/api/books/${ObjectID()}`)
        .end((err, res) => {
          expect(err).to.be.null;
          result = res;
          done();
        })
    });

    it('Returns an error message noting that no such book was found', (done) => {
      expect(result).to.have.status(400);
      expect(result).to.be.json;
      expect(result.body).to.not.be.empty;
      expect(result.body).to.equal('no book exists');
      done();
    });
  });

  context('Valid DELETE request for /books', () => {
    let result;
    let book;

    before(done => {
      chai.request(app)
        .get('/api/books')
        .then(res => {
          book = res.body[0];
          const { _id } = book;
          chai.request(app)
            .delete(`/api/books/${_id}`)
            .set('Content-Type', 'application/json; charset=utf-8')
            .end((err, res) => {
              if (err) throw err;
              else {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.not.be.empty;
                result = res;
                done();
              }
            })
        })
        .catch(done);
    });

    it('Returns a success message', (done) => {
      expect(result.body).to.equal('delete successful');
      done();
    });
  });

  context('Invalid DELETE request for /books', () => {
    let result;

    before(done => {
      chai.request(app)
        .delete('/api/books/garbage')
        .set('content-type', 'application/json; charset=utf-8')
        .end((err, res) => {
          if (err) done(err);
          else {
            expect(res).to.have.status(400);
            expect(res).to.be.json;
            expect(res.body).to.not.be.empty;
            result = res;
            done();
          }
        })
    });

    it('Returns an error  message if a valid ID is not supplied', (done) => {
      expect(result.body).to.equal('Valid _id not supplied');
      done();
    });
  });

  context('Deleting all books from the database', () => {
    let result;

    before(done => {
      chai.request(app)
        .delete('/api/books/')
        .set('content-type', 'application/json; charset=utf-8')
        .end((err, res) => {
          if (err) done(err);
          else {
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.body).to.not.be.empty;
            result = res;
            done();
          }
        })
    });

    it('Returns a success message', (done) => {
      expect(result.body).to.equal('complete delete successful');
      done();
    });

    it('Has removed all the books', (done) => {
      chai.request(app)
        .get('/api/books')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.empty;
          done();
        })
    });

  });

  context('Adding a comment to a book', () => {

    before(done => {
      const idx = Math.floor(Math.random() * books.length)
      const testBook = books[idx];
      const { author, title } = testBook;
      chai.request(app)
        .post('/api/books')
        .set('Content-Type', 'application/json; charset=utf-8')
        .send({ author, title })
        .end((err, res) => {
          if (err) done(err);
          else {
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.body).to.not.be.empty;
            done();
          }
        })
    });

    it('Returns a confirmation and the Comment data');
    it('Returns a valid ObjectID for the Comment');

    it('Throws an error if no comment data is supplied', (done) => {
      chai.request(app)
        .post(`/api/books/blah`)
        .set('content-type', 'application/json; charset=utf-8')
        // .send({ comment: null })
        .end((err, res) => {
          if (err) done(err);
          else {
            expect(res).to.have.status(400);
            expect(res).to.be.json;
            expect(res.body).to.not.be.empty;
            expect(res.body).to.equal('missing required field comment');
            done();
          }
        })
    });
  });

  context('Deleting a comment from a book', () => {
    it('Returns a confirmation with the Comment ID');
    it('Does not return the deleted comment with the book');
  });

});
