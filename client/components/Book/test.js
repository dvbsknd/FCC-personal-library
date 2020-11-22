const React = require('react');
const { render, screen, } = require('@testing-library/react');
const expect = require('chai').expect;
const { books } = require('../../../tests/mocks.js');

// We have to use an import because components are
// exported using ES6 modules
import Book from './';

describe('<Book>', () => {

  before(() => {
    render(
      <Book book={books[1]} />
    );
  });

  it('Displays a single book from the app state', () => {
    expect(screen.queryByText(books[1].title)).to.not.be.null;
  });
  it('Displays the title and author of the book');
  it('Shows a comments area where a comments component will be rendered');
  it('Displays a "back" link to return to the book list');

});
