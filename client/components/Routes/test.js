'use strict';

const React = require('react');
const expect = require('chai').expect;
const { render, screen, fireEvent } = require('@testing-library/react');
const { books } = require('../../../tests/mocks.js');

// We have to use an import because components are
// exported using ES6 modules
import Routes from './';
import { createMemoryHistory } from "history";
import { Router } from "react-router";

describe('<Routes>', () => {

  const setBooks = () => {};
  const history = createMemoryHistory();

  beforeEach(() => {
    render(
      <Router history={history}>
        <Routes books={books} setBooks={setBooks}/>
      </Router>,
    );
  });


  it('Shows the <BookList> when accessing the home page', () => {
    const title = screen.getByText(books[0].title);
    expect(title).to.be.instanceOf(HTMLHeadingElement);
    expect(history.location.pathname).to.equal('/');
  });

  it('Shows a <Book> when accessing a page with an :id param', () => {
    const links = screen.getAllByText('View');
    fireEvent.click(links[0]);
    expect(history.location.pathname).to.equal(links[0].href);
    const title = screen.getByText(books[0].title);
    expect(title).to.be.instanceOf(HTMLHeadingElement);
    const comments = screen.getByText('Comments');
    expect(comments).to.be.instanceOf(HTMLHeadingElement);
  });


});
