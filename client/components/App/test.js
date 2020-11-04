'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const { act } = require('react-dom/test-utils');
const { JSDOM } = require("jsdom");
const dom = new JSDOM(``, { url: "https://test.dev/", });
const fetchMock = require('fetch-mock');
const expect = require('chai').expect;

// We have to use an import because components are
// exported using ES6 modules
import App from './';

describe('<App>', () => {

  let container;
  global.window = dom.window;

  beforeEach(() => {
    fetchMock.mock('/api/books', [{ _id: '5f8fa8dc74e0e8daa000ef56', title: 'Test', author: 'me'}]);
    container = dom.window.document.createElement('div');
    container.setAttribute('id', 'root');
    dom.window.document.body.appendChild(container);
  });

  afterEach(() => {
    dom.window.document.body.removeChild(container);
    container = null;
    fetchMock.restore();
  });

  it('Renders the main App component and site title',() => {

    act(() => {
      ReactDOM.render(<App />, container);
    });

    const header = container.querySelector('h1.header');
    expect(header.textContent).to.equal('My Books');
  });
  it('Shows a loading indicator while waiting for data');
  it('Shows the BookList component once data is fetched');
});
