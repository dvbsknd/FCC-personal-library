'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const { act } = require('react-dom/test-utils');
const Component = require('./index.js');

describe('<App>', () => {

  let container;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  it('Renders the main App component and site title',() => {

    act(() => {
      ReactDOM.render(<Component />, container);
    });
    
    const header = container.querySelector('h1.header');
    expect(header.textContent).toBe('My Books');
  });
});
