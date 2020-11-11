'use strict';

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'semantic-ui-react';
import BookListItem from '../BookListItem';

const BookList = (props) => {

  const [deleteButton, showDeleteButton] = useState(false);

  const deleteBook = bookId => {

    console.log(`Deleting book ${bookId}`);

    // Save the current state in case deletion fails and
    // we need to restore it
    const currentData = props.books;

    // Remove the item from the DOM immediately and restore
    // it later if deletion at the API fails
    props.setData(current => current.filter(book => book._id !== bookId));

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
        props.setData(currentData);
      });
  };

  return (
    <Card.Group itemsPerRow={3}>
      {props.books.map((book, idx) => (
        <BookListItem
          author={book.author}
          title={book.title}
          bookId={book._id}
          key={idx}
          deleteBook={deleteBook} />)
      )}
    </Card.Group>
  );
};

BookList.propTypes = {
  setData: PropTypes.func.isRequired,
  books: PropTypes.arrayOf(PropTypes.shape({
    _id: function(props, propName, componentName) {
      if (props[propName] && props[propName].length !== 24) {
        return new Error(`Expected ${propName} to exist and have a length of 24`);
      }
    },
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired
  }))
}

export default BookList;
