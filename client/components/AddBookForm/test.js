'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const { act } = require('react-dom/test-utils');
const { JSDOM } = require("jsdom");
const dom = new JSDOM(``, { url: "https://test.dev/", });
const expect = require('chai').expect;

// We have to use an import because components are
// exported using ES6 modules
import AddBookForm from './';

describe('<AddBookForm>', () => {

  let container;
  global.window = dom.window;

  beforeEach(() => {
    container = dom.window.document.createElement('div');
    container.setAttribute('id', 'root');
    dom.window.document.body.appendChild(container);
    act(() => {
      ReactDOM.render(<AddBookForm />, container);
    });
  });

  afterEach(() => {
    dom.window.document.body.removeChild(container);
    container = null;
  });

  it('Renders a form with field for Book and Title');
  it('Has a submit button that will send data to the API');
});
