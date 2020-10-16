'use strict';

const chai = require('chai')
const chaiHttp = require('chai-http');
const server = require('../server');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Server', () => {
  context('When requesting the site root', () => {
    let result;
    before(done => {
      chai.request(server)
        .get('/')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          result = res;
          done();
        })
    });
    it('Serves an HTML home page containing the site title', (done) => {
      expect(result).to.be.html;
      expect(result.text).to.include('Macro Tracker');
      done();
    });
    it('Responds with a valid Content-Security-Policy header', (done) => {
      expect(result).to.have.header('Content-Security-Policy');
      done();
    });
  });
});
