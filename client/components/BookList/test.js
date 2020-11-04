'use strict';

const React = require('react');
const { render } = require('@testing-library/react');
const expect = require('chai').expect;

// We have to use an import because components are
// exported using ES6 modules
import BookList from './';

describe('<BookList>', () => {

  before(function () {
    this.jsdom = require('jsdom-global')()
  });

  after(function () {
    this.jsdom()
  });

  const data = [
    { _id: 't30seuObeWGB1rYc0ZLNmrTq', title: 'Test One', author: 'Author One'},
    { _id: 'gjpXf6jnAMFKll6XHFLKozS3', title: 'Test Two', author: 'Author Two'},
    { _id: 'Sh3LpackRYOf1oSBxKKBtumI', title: 'Test Three', author: 'Author Three'}
  ];

  it('Renders a card for each book passed to it', (done) => {
    const component = render(<BookList books={data} />);
    data.forEach(book => {
      const title = component.getByText(book.title);
      const author = component.getByText(book.author);
      expect(title.textContent).to.equal(book.title);
      expect(author.textContent).to.equal(book.author);
    });
    done();
  });
});
