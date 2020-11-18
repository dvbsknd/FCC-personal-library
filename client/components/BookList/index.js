'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  Loader,
  Divider } from 'semantic-ui-react';
import BookListItem from '../BookListItem';
import AddBookForm from '../AddBookForm'

const BookList = (props) => {

  const deleteBook = bookId => {

    console.log(`Deleting book ${bookId}`);

    // Save the current state in case deletion fails and
    // we need to restore it
    const currentData = props.books;

    // Remove the item from the DOM immediately and restore
    // it later if deletion at the API fails
    props.setBooks(current => current.filter(book => book._id !== bookId));

    // Send the delete request
    fetch('/api/books', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ _id: bookId })
    })
      .then(res => {
        if (!res.ok) throw new Error(`[API Error] ${res.status}: ${res.statusText}`)
      })
    // If there was an error, restore the original state to the DOM
    // If there wasn't the end state is already as desired so do nothing
      .catch(err => {
        console.log(err);
        console.log(`Restoring deleted book ${bookId} to the list`);
        props.setBooks(currentData);
      });
  };

  return (
    props.loading ? (
      <Loader active inline='centered' size='medium'>Fetching data...</Loader>
    ) : (
      <>
        <Card.Group itemsPerRow={3}>
          {props.books.map((book, idx) => (
            <BookListItem
              author={book.author}
              title={book.title}
              bookId={book._id}
              key={idx}
              deleteBook={deleteBook} />
          ))}
        </Card.Group>
        <Divider hidden />
        <AddBookForm books={props.books} setBooks={props.setBooks} />
      </>
    )
  );
};

BookList.propTypes = {
  loading: PropTypes.bool.isRequired,
  setBooks: PropTypes.func.isRequired,
  books: PropTypes.arrayOf(PropTypes.shape({
    _id: function(props, propName) {
      if (props[propName] && props[propName].length !== 24) {
        return new Error(`Expected ${propName} to exist and have a length of 24`);
      }
    },
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired
  }))
}

export default BookList;
