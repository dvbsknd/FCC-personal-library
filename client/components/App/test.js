'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const { act } = require('react-dom/test-utils');
const { JSDOM } = require("jsdom");
const dom = new JSDOM(``);
const fetch = require('node-fetch');
const fetchMock = require('fetch-mock');
const expect = require('chai').expect;
import App from './';

describe('<App>', () => {

  let container;
  global.window = dom.window;
  let document = window.document;
  global.fetch = fetch;

  beforeEach(() => {
    container = document.createElement('div');
    container.setAttribute('id', 'root');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  it('Renders the main App component and site title',() => {

    act(() => {
      ReactDOM.render(<App />, container);
    });
    const header = container.querySelector('h1.header');
    expect(header.textContent).toBe('My Books');
  });
});
