'use strict';

const React = require('react');
const { render, screen } = require('@testing-library/react');
const { default: userEvent } = require('@testing-library/user-event');
const fetchMock = require('fetch-mock');
const expect = require('chai').expect;

// We have to use an import because components are
// exported using ES6 modules
import AddBookForm from './';

describe('<AddBookForm>', () => {

  const mockResponse = {
    "success": true,
    "message": "Book added",
    "document": {
      "title": "David Baskind",
      "author": "Avid Asking",
      "_id": "5fa4f612c9ed1b404e0aed53"
    }
  };

  const component = render(<AddBookForm />);

  before(function () {
    fetchMock.post('/api/books', mockResponse);
  })

  after(function () {
    fetchMock.restore();
  })

  it('Renders a form with field for Book and Title', () => {
    console.log(screen);
    const title = screen.getByLabelText('Book Title');
    const author = screen.getByLabelText('Author');
    screen.debug();
    expect(title).to.be.instanceOf(HTMLInputElement);
    expect(author).to.be.instanceOf(HTMLInputElement);
  });
  it('Accepts input into the form fields', () => {
    console.log(screen);
    const title = screen.getByLabelText('Book Title');
    const author = screen.getByLabelText('Author');
    screen.debug();
    expect(title).to.be.instanceOf(HTMLInputElement);
    expect(author).to.be.instanceOf(HTMLInputElement);
  });
  it('Submits data to the API with click');
  it('Submits data to the API with keypress (enter)');
  it('Shows a loading indicator while waiting for the API');
  it('Clears the input fields once data is received');
  it('Shows an API error if one is received');
  it('Clears the error message if submission is retried');
});
