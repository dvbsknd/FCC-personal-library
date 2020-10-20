'use strict';

const chai = require('chai')
const chaiHttp = require('chai-http');
const app = require('express')();
const api = require('../routes');
const expect = chai.expect;
app.use('/api', api);

chai.use(chaiHttp);

describe('API', () => {
  context('GET request for /books', () => {
    let result;
    before(done => {
      chai.request(app)
        .get('/api/books')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          result = res;
          done();
        })
    });
    it('Returns a JSON array of Books with author and title', (done) => {
      expect(result).to.be.json;
      expect(result.body).to.not.be.empty;
      result.body.forEach(book => {
        expect(book).to.have.keys(['_id', 'title', 'author']);
      });
      done();
    });
  });
});
