'use strict';

const React = require('react');
const { render, screen } = require('@testing-library/react');
const expect = require('chai').expect;

// We have to use an import because components are
// exported using ES6 modules
import BookList from './';

// We also have to import BrowserRouter becuase the <Link>
// component doesn't inherit the Router context from its
// parents when run atomically
import { BrowserRouter as DummyRouter } from 'react-router-dom';

describe('<BookList>', () => {

  const data = [
    { _id: 't30seuObeWGB1rYc0ZLNmrTq', title: 'Test One', author: 'Author One'},
    { _id: 'gjpXf6jnAMFKll6XHFLKozS3', title: 'Test Two', author: 'Author Two'},
    { _id: 'Sh3LpackRYOf1oSBxKKBtumI', title: 'Test Three', author: 'Author Three'}
  ];

  const setBooks = () => {};
  let loading = true;

  beforeEach(() => {
    render(
      <DummyRouter>
        <BookList loading={loading} books={data} setBooks={setBooks}/>
      </DummyRouter>
    );
  });

  it('Shows a loading indicator while waiting for data', () => {

    const loader = screen.getByText('Fetching data...');
    expect(loader).to.be.instanceOf(HTMLDivElement);
    expect(loader.className).to.include('loader');
    loading = false;

  });

  it('Shows the BookList component once data is fetched');

  it('Renders a card for each book passed to it', (done) => {
    data.forEach(book => {
      const title = screen.getByText(book.title);
      const author = screen.getByText(book.author);
      expect(title.textContent).to.equal(book.title);
      expect(author.textContent).to.equal(book.author);
    });
    done();
  });
  it('Deletes a book from the API & DOM when asked to');
});
