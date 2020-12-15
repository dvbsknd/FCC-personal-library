'use strict';

const React = require('react');
const { render, screen } = require('@testing-library/react');
const expect = require('chai').expect;
const { books } = require('../../../tests/mocks.js');

// We have to use an import because components are
// exported using ES6 modules
import Comments from './';

describe('<Comments>', () => {

  const book = books[0];
  const { _id, comments } = book;

  beforeEach(() => {
    render(
      <Comments bookId={_id} comments={comments} />
    );
  });

  it('Renders all the comments for the book passed to it', () => {
    comments.forEach(comment => {
      const author = screen.getByText(comment.author);
      const text = screen.getByText(comment.comment);
      expect(author.textContent).to.equal(comment.author);
      expect(text.textContent).to.equal(comment.comment);
    });
  });

  it('Renders a form for adding more comments', () => {
    expect(screen.queryByPlaceholderText('Full name')).to.not.be.null;
    expect(screen.queryByPlaceholderText('Tell us what you think...')).to.not.be.null;
  });

});
