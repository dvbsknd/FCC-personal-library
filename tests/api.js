'use strict';

const chai = require('chai')
const chaiHttp = require('chai-http');
const app = require('express')();
const api = require('../routes');
const expect = chai.expect;

app.use('/api', api);
chai.use(chaiHttp);

describe('API', () => {

   context('POST request for /books', () => {
    let result;
    before(done => {
      chai.request(app)
        .post('/api/books')
        .set('Content-Type', 'application/json; charset=utf-8')
        .send({ title: 'Bow Down and Obey', author: 'Ibram X. Kendi'})
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
    it('Returns a success message and the ID of the newly added book', (done) => {
      expect(result.body.success).to.be.equal(true);
      expect(result.body).to.have.keys(['success', 'message', 'document']);
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
  context('Valid DELETE request for /books', () => {
    let result;
    before(done => {
      chai.request(app)
        .delete('/api/books')
        .set('Content-Type', 'application/json; charset=utf-8')
        .send({ _id: book._id })
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
    it('Returns a success message and the ID of the deleted book', (done) => {
      expect(result.body).to.have.keys(['success', 'message', '_id']);
      expect(result.body.message).to.equal('Book deleted');
      expect(result.body._id).to.equal(book._id);
      done();
    });
  });
  context('Invalid DELETE request for /books', () => {
    let result;
    before(done => {
      chai.request(app)
        .delete('/api/books')
        .set('Content-Type', 'application/json; charset=utf-8')
        .send({ data: 'garbage' })
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
    it('Returns an error  message a valid ID is not supplied', (done) => {
      expect(result.body).to.have.keys(['error']);
      expect(result.body.error).to.equal('Could not delete book');
      done();
    });
  });

  context('Adding a comment to a book', () => {
    it('Returns a confirmation and the Comment data');
    it('Returns a valid ObjectID for the Comment');
  });

  context('Deleting a comment from a book', () => {
    it('Returns a confirmation with the Comment ID');
    it('Does not return the deleted comment with the book');
  });

});
