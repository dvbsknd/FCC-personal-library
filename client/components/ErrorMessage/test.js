const React = require('react');
const { render, screen, } = require('@testing-library/react');
const expect = require('chai').expect;

// We have to use an import because components are
// exported using ES6 modules
import ErrorMessage from './';

describe('<ErrorMessage>', () => {

  const error = {
    error: 'Something went wrong',
    message: 'This is a test error message'
  };

  beforeEach(() => {
    render(
      <ErrorMessage label={error.error}  message={error.message} />
    );
  });

  it('Displays the supplied error as a title', () => {
    expect(screen.queryByText(error.error)).to.not.be.null;
    expect(screen.getByText(error.error).className).to.equal('header');
  });

  it('Displays the supplied message', () => {
    expect(screen.queryByText(error.message)).to.not.be.null;
  });
  it('Implies negativity with a red border');

});
