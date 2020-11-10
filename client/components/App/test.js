'use strict';

const React = require('react');
const { render } = require('@testing-library/react');
const fetchMock = require('fetch-mock');
const expect = require('chai').expect;

// We have to use an import because components are
// exported using ES6 modules
import App from './';

describe('<App>', () => {

  before(function () {
    this.jsdom = require('jsdom-global')()
    fetchMock.mock('/api/books', [{ _id: '5f8fa8dc74e0e8daa000ef56', title: 'Test', author: 'me'}]);
  })

  after(function () {
    this.jsdom()
    fetchMock.restore();
  })

  it('Renders the main App component with site title', () => {
    const component = render(<App />);
    const title = component.getByText('My Books');
    expect(title).to.be.instanceOf(HTMLHeadingElement);
  });
});
