const React = require('react');
const { render, screen, } = require('@testing-library/react');
const { default: userEvent } = require('@testing-library/user-event');
const expect = require('chai').expect;

// We have to use an import because components are
// exported using ES6 modules
import BookListItem from './';

describe('<BookListItem>', () => {

  let _id = null;

  const book = {
    "title": "Book Three",
    "author": "Avid Asking",
    "_id": "5fa4f612c9ed1b404e0aed53"
  };

  const deleteBook = (bookId) => {
    _id = bookId;
  }

  beforeEach(() => {
    render(
      <BookListItem 
        author={book.author}
        title={book.title}
        bookId={book._id}
        deleteBook={deleteBook} 
      />);
  });

  it('Renders the book title and author', () => {
    expect(screen.queryByText(book.title)).to.exist;
    expect(screen.queryByText(book.author)).to.exist;
  });

  it('Displays a delete button/icon when hovered over', () => {
    userEvent.hover(screen.queryByText(book.title));
    expect(screen.queryByLabelText('Delete')).to.exist;
    userEvent.unhover(screen.queryByText(book.title));
    expect(screen.queryByLabelText('Delete')).not.exist;
  });
  it('Calls the deleteBook function with the bookId when the button is clicked', () => {
    userEvent.hover(screen.queryByText(book.title));
    expect(_id).to.be.null;
    userEvent.click(screen.queryByLabelText('Delete'));
    expect(_id).to.equal(book._id);
  });

});
