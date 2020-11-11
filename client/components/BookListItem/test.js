'use strict';

const React = require('react');
const { render, screen, waitFor } = require('@testing-library/react');
const { default: userEvent } = require('@testing-library/user-event');
const fetchMock = require('fetch-mock');
const expect = require('chai').expect;

// We have to use an import because components are
// exported using ES6 modules
import BookListItem from './';

describe('<BookListItem>', () => {

  let component, title, author, _id;

  const book = {
    "title": "Book Three",
    "author": "Avid Asking",
    "_id": "5fa4f612c9ed1b404e0aed53"
  };

  const response = {
    "success": true,
    "message": "Book deleted"
  };

  const deleteBook = (bookId) => {
    console.log(bookId);
    _id = bookId;
  }

  before(function () {
    fetchMock.delete('/api/books', response);
  })

  after(function () {
    fetchMock.restore();
  })

  beforeEach(() => {
    component = render(
      <BookListItem 
        author={book.author}
        title={book.title}
        bookId={book._id}
        deleteBook={deleteBook} 
      />);
    title = screen.queryByText(book.title);
    author = screen.queryByText(book.title);
  });

  it('Renders the book title and author', () => {
    expect(title).to.exist;
    expect(author).to.exist;
  });

  it('Displays a delete button/icon when hovered over');
  it('Calls the deleteBook function with the bookId when the button is clicked');

});
