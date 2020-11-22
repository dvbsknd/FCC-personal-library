'use strict';

const React = require('react');
const { render, screen } = require('@testing-library/react');
const expect = require('chai').expect;
const { books } = require('../../../tests/mocks.js');

// We have to use an import because components are
// exported using ES6 modules
import BookList from './';

// We also have to import BrowserRouter becuase the <Link>
// component doesn't inherit the Router context from its
// parents when run atomically
import { BrowserRouter as DummyRouter } from 'react-router-dom';

describe('<BookList>', () => {

  const setBooks = () => {};

  beforeEach(() => {
    render(
      <DummyRouter>
        <BookList books={books} setBooks={setBooks}/>
      </DummyRouter>
    );
  });

  it('Renders a card for each book passed to it', () => {
    books.forEach(book => {
      const title = screen.getByText(book.title);
      const author = screen.getByText(book.author);
      expect(title.textContent).to.equal(book.title);
      expect(author.textContent).to.equal(book.author);
    });
  });

  it('Deletes a book from the API & DOM when asked to');
});
