'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const { act } = require('react-dom/test-utils');
const { JSDOM } = require("jsdom");
const dom = new JSDOM(``, { url: "https://test.dev/", });
const expect = require('chai').expect;

// We have to use an import because components are
// exported using ES6 modules
import BookList from './';

describe('<BookList>', () => {

  let container;
  global.window = dom.window;
  const testData = [
    { _id: '^67^', title: 'Test One', author: 'me'},
    { _id: '^68^', title: 'Test Two', author: 'me'},
    { _id: '^69^', title: 'Test Three', author: 'me'}
  ];

  beforeEach(() => {
    container = dom.window.document.createElement('div');
    container.setAttribute('id', 'root');
    dom.window.document.body.appendChild(container);
  });

  afterEach(() => {
    dom.window.document.body.removeChild(container);
    container = null;
  });

  it('Renders a card for each book passed to it',() => {

    act(() => {
      ReactDOM.render(<BookList books={testData} />, container);
    });

    const cards = dom.window.document.querySelectorAll('.cards > .card > .content');
    cards.forEach((card, idx) => {
      expect(card.querySelector('.bookTitle').textContent).to.equal(testData[idx].title);
      expect(card.querySelector('.bookAuthor').textContent).to.equal(testData[idx].author);
    });
  });
});
