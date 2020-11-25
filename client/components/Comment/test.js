'use strict';

const React = require('react');
const { render, screen } = require('@testing-library/react');
const { default: userEvent } = require('@testing-library/user-event');
const expect = require('chai').expect;
const { books } = require('../../../tests/mocks.js');

// We have to use an import because components are
// exported using ES6 modules
import Comment from './';

describe('<Comment>', () => {

  const comment = books[0].comments[0];
  let args;
  const fn = function () { args = arguments[0] };

  beforeEach(() => {
    render(
      <Comment comment={comment} deleteComment={fn}  />
    );
  });

  it('Renders the comment author', () => {
    expect(screen.getByText(comment.author).className).to.equal('author');
  });

  it('Renders the comment text', () => {
    expect(screen.getByText(comment.text).className).to.equal('text');
  });

  it('Renders the comment date (of creation) in the expected format', () => {
    expect(screen.queryByText(comment.createdAt.toLocaleString())).to.be.ok;
  });

  it('Calls #deleteComment with the comment id when asked', () => {
    const button = screen.queryByText('Delete');
    expect(button).to.be.ok;
    userEvent.click(button);
    expect(args).to.equal(comment.id);
  });

  it('Removes the deleted comment from the list of comments when asked');

});
