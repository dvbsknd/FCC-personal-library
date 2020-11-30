const React = require('react');
const { render, screen, queryByLabelText } = require('@testing-library/react');
const { default: userEvent } = require('@testing-library/user-event');
const { books } = require('../../../tests/mocks.js');
const expect = require('chai').expect;

// We have to use an import because components are
// exported using ES6 modules
import BookListItem from './';

// We also have to import BrowserRouter becuase the <Link>
// component doesn't inherit the Router context from its
// parents when run atomically
import { BrowserRouter as DummyRouter } from 'react-router-dom';

describe('<BookListItem>', () => {

  let _id = null;
  const book = books[0];

  const deleteBook = (bookId) => {
    _id = bookId;
  }

  beforeEach(() => {
    render(
      <DummyRouter>
        <BookListItem book={book} deleteBook={deleteBook} />
      </DummyRouter>
    );
  });

  it('Renders the book title and author', () => {
    expect(screen.queryByText(book.title)).to.exist;
    expect(screen.queryByText(book.author)).to.exist;
  });

  it('Displays a delete button/icon when hovered over', () => {
    const card = screen.queryByText(book.title).parentNode.parentNode;
    userEvent.hover(card);
    expect(queryByLabelText(card, 'Delete')).to.exist;
  });
  it('Calls the deleteBook function with the bookId when the button is clicked', () => {
    userEvent.hover(screen.queryByText(book.title));
    expect(_id).to.be.null;
    userEvent.click(screen.queryByLabelText('Delete'));
    expect(_id).to.equal(book._id);
  });

});
