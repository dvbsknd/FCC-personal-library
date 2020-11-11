'use strict';

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'semantic-ui-react';
import BookListItem from '../BookListItem';

const BookList = (props) => {

  const [deleteButton, showDeleteButton] = useState(false);

  const deleteBook = bookId => {
    console.log('Deleting', bookId);
    fetch('/api/books', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ _id: bookId })
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          console.log('[API Error]', data);
        } else {
          props.setData(current => current.filter(book => book._id !== bookId));
        }
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
