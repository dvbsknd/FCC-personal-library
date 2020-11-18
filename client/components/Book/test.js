const React = require('react');
const { render, screen, } = require('@testing-library/react');
const expect = require('chai').expect;

// We have to use an import because components are
// exported using ES6 modules
import Book from './';

describe('<Book>', () => {

  const books = [
    { _id: 't30seuObeWGB1rYc0ZLNmrTq', title: 'Test One', author: 'Author One'},
    { _id: 'gjpXf6jnAMFKll6XHFLKozS3', title: 'Test Two', author: 'Author Two'},
    { _id: 'Sh3LpackRYOf1oSBxKKBtumI', title: 'Test Three', author: 'Author Three'}
  ];
  const bookId = books[1]._id;
  let loading = true;

  beforeEach(() => {
    render(
      <Book loading={loading} bookId={bookId} books={books} />
    );
  });

  it('Shows a loading indicator while waiting for data', () => {

    const loader = screen.getByText('Fetching data...');
    expect(loader).to.be.instanceOf(HTMLDivElement);
    expect(loader.className).to.include('loader');
    loading = false;

  });

  it('Displays a single book from the app state');
  it('Displays the title and author of the book');
  it('Shows a comments area where a comments component will be rendered');
  it('Displays a "back" link to return to the book list');

});
