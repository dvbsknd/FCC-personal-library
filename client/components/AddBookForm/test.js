'use strict';

const React = require('react');
const { render, screen, waitFor } = require('@testing-library/react');
const { default: userEvent } = require('@testing-library/user-event');
const fetchMock = require('fetch-mock');
const expect = require('chai').expect;

// We have to use an import because components are
// exported using ES6 modules
import AddBookForm from './';

describe('<AddBookForm>', () => {

  let component, title, author;

  let books = [
   {
      "title": "Book One",
      "author": "Avid Asking",
      "_id": "5fa4f612c9ed1b404e0aed53"
    },
    {
      "title": "Book Two",
      "author": "Avid Asking",
      "_id": "5fa4f612c9ed1b404e0aed53"
    }
  ];

  const book = {
      "title": "Book Three",
      "author": "Avid Asking"
  };

  const response = {
    "success": true,
    "message": "Book added",
    "document": book
  };

  const setData = (reducer) => {
    books = reducer(books);
  }

  before(function () {
    fetchMock.post('/api/books', response);
  })

  after(function () {
    fetchMock.restore();
  })

  beforeEach(() => {
    component = render(<AddBookForm setData={setData} />);
    title = screen.getByLabelText('Book Title');
    author = screen.getByLabelText('Author');
  });

  it('Renders a form with field for Book and Title', () => {
    expect(title).to.be.instanceOf(HTMLInputElement);
    expect(author).to.be.instanceOf(HTMLInputElement);
  });

  it('Accepts input into the form fields', () => {
    userEvent.type(title, response.document.title);
    userEvent.type(author, response.document.author);
    expect(title.value).to.equal(response.document.title);
    expect(author.value).to.equal(response.document.author);
  });

  it('Submits data to the API with click', async () => {
    userEvent.click(screen.getByText('Submit'));
    await waitFor(() => screen.getByText('Submit'))
    expect(books).to.have.length(3);
    expect(books[2].title).to.equal(book.title);
  });

  it('Submits data to the API with keypress (enter)', async () => {
    userEvent.type(title, book.title + '{enter}');
    await waitFor(() => screen.getByText('Submit'))
    expect(books).to.have.length(4);
    expect(books[2].title).to.equal(book.title);
  });

  it('Shows a loading indicator while waiting for the API');
  it('Clears the input fields once data is received');
  it('Shows an API error if one is received');
  it('Clears the error message if submission is retried');
});
