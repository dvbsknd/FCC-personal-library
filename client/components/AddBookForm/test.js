'use strict';

const React = require('react');
const { render, screen, waitFor } = require('@testing-library/react');
const { default: userEvent } = require('@testing-library/user-event');
const fetchMock = require('fetch-mock');
const expect = require('chai').expect;
const { books: mockBooks } = require('../../../tests/mocks.js');

// We have to use an import because components are
// exported using ES6 modules
import AddBookForm from './';

describe('<AddBookForm>', () => {

  let title, author, books;

  const book = {
      "title": "Book Three",
      "author": "Avid Asking"
  };

  const response = book;

  const setBooks = (reducer) => {
    books = reducer(books);
  }

  before(function () {
    fetchMock.post('/api/books', response);
  })

  after(function () {
    fetchMock.restore();
  })

  beforeEach(() => {
    books = [...mockBooks];
    render(<AddBookForm setBooks={setBooks} />);
    title = screen.getByLabelText('Book Title');
    author = screen.getByLabelText('Author');
  });

  it('Renders a form with field for Book and Title', () => {
    expect(title).to.be.instanceOf(HTMLInputElement);
    expect(author).to.be.instanceOf(HTMLInputElement);
  });

  it('Accepts input into the form fields', () => {
    userEvent.type(title, book.title);
    userEvent.type(author, book.author);
    expect(title.value).to.equal(book.title);
    expect(author.value).to.equal(book.author);
  });

  it('Submits data to the API with click', async () => {
    userEvent.click(screen.getByText('Submit'));
    await waitFor(() => screen.getByText('Submit'))
    expect(books).to.have.length(mockBooks.length + 1);
    expect(books[books.length - 1].title).to.equal(book.title);
  });

  it('Submits data to the API with keypress (enter)', async () => {
    userEvent.type(title, book.title + '{enter}');
    await waitFor(() => screen.getByText('Submit'))
    expect(books).to.have.length(mockBooks.length + 1);
    expect(books[books.length - 1].title).to.equal(book.title);
  });

  it('Shows a loading indicator while waiting for the API');
  it('Clears the input fields once data is received');
  it('Shows an API error if one is received');
  it('Clears the error message if submission is retried');
});
