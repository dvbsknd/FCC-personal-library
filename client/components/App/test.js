'use strict';

const React = require('react');
const expect = require('chai').expect;
const { render, screen } = require('@testing-library/react');
const fetchMock = require('fetch-mock');
const { books } = require('../../../tests/mocks.js');

// We have to use an import because components are
// exported using ES6 modules
import App from './';

describe('<App>', () => {

  beforeEach(function () {
    fetchMock.mock('/api/books', books);
    render(<App />);
  })

  afterEach(function () {
    fetchMock.restore();
  })

  it('Renders the main App component with site title', () => {
    const title = screen.getByText('My Books');
    expect(title).to.be.instanceOf(HTMLHeadingElement);
  });

  it('Shows a loading indicator while waiting for data', () => {
    const loader = screen.getByText('Fetching data...');
    expect(loader).to.be.instanceOf(HTMLDivElement);
    expect(loader.className).to.include('loader');
  });

  it('Fetches books from the API and updates its state');

});
