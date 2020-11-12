'use strict';

const React = require('react');
const { render } = require('@testing-library/react');
const expect = require('chai').expect;

// We have to use an import because components are
// exported using ES6 modules
import BookList from './';

describe('<BookList>', () => {

  const data = [
    { _id: 't30seuObeWGB1rYc0ZLNmrTq', title: 'Test One', author: 'Author One'},
    { _id: 'gjpXf6jnAMFKll6XHFLKozS3', title: 'Test Two', author: 'Author Two'},
    { _id: 'Sh3LpackRYOf1oSBxKKBtumI', title: 'Test Three', author: 'Author Three'}
  ];

  const setData = () => {};

  it('Shows a loading indicator while waiting for data',

    /* The below will be refactored once the loading indicator
     * has been moved to this component from the <App /> component
     *
    () => {
    const component = render(<App />);
    const loader = component.getByText('Fetching data...');
    expect(loader).to.be.instanceOf(HTMLDivElement);
    expect(loader.className).to.include('loader');
    }
    */

  );
  it('Shows the BookList component once data is fetched');
  it('Renders a card for each book passed to it', (done) => {
    const component = render(<BookList books={data} setData={setData}/>);
    data.forEach(book => {
      const title = component.getByText(book.title);
      const author = component.getByText(book.author);
      expect(title.textContent).to.equal(book.title);
      expect(author.textContent).to.equal(book.author);
    });
    done();
  });
  it('Deletes a book from the API & DOM when asked to');
});
